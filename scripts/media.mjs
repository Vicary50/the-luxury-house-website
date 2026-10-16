// Media pipeline: shrinks the camera photos in public/images in place and
// transcodes the hero videos into public/video.
//
//   node scripts/media.mjs            # photos + videos
//   node scripts/media.mjs photos     # photos only
//   node scripts/media.mjs videos     # videos only
//
// Videos need ffmpeg on PATH, or FFMPEG=/path/to/ffmpeg.
// Safe to re-run: photos already at or under the limit are left alone, and the
// originals stay in git history (commit 863c546 and earlier).
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES = path.join(ROOT, 'public/images');
const VIDEO_OUT = path.join(ROOT, 'public/video');
const MAX_EDGE = 2560;
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const TARGET_MB = 5; // per file; the bitrate is derived from each film's length
// Source films live beside the repo, not in it. `name` is the output basename;
// `cropY` places the 16:9 landscape window down the portrait frame (0 top, 1 bottom).
const VIDEOS = [
  { src: '../DE2092AF-6202-44C0-BEDB-010788D13BDC.MP4', name: 'kitchen-film', cropY: 0.5 },
  { src: '../IMG_2553.MOV', name: 'walkthrough-film', cropY: 0.5 },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.jpe?g$/i.test(entry.name)) yield full;
  }
}

async function photos() {
  let before = 0;
  let after = 0;
  for await (const file of walk(IMAGES)) {
    const input = await readFile(file);
    before += input.length;
    // .rotate() bakes in the EXIF orientation before the metadata is dropped.
    const meta = await sharp(input).metadata();
    const edge = Math.max(meta.width, meta.height);
    if (edge <= MAX_EDGE && input.length < 1_500_000) {
      after += input.length;
      continue;
    }
    const output = await sharp(input)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await writeFile(file, output);
    after += output.length;
    console.log(`${path.relative(IMAGES, file)}  ${mb(input.length)} -> ${mb(output.length)}`);
  }
  console.log(`photos: ${mb(before)} -> ${mb(after)}`);
}

function ffmpeg(args) {
  execFileSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
}

// `ffmpeg -i` with no output exits non-zero but prints the Duration line first.
function durationSeconds(src) {
  let out = '';
  try {
    execFileSync(FFMPEG, ['-hide_banner', '-i', src], { stdio: 'pipe' });
  } catch (err) {
    out = String(err.stderr);
  }
  const [, h, m, s] = out.match(/Duration: (\d+):(\d+):([\d.]+)/) ?? [];
  if (!h) throw new Error(`no duration for ${src}`);
  return h * 3600 + m * 60 + Number(s);
}

async function videos() {
  await mkdir(VIDEO_OUT, { recursive: true });
  for (const v of VIDEOS) {
    const src = path.resolve(ROOT, v.src);
    const kbps = Math.floor((TARGET_MB * 8000) / durationSeconds(src));
    // Portrait for phones; 16:9 window cut from the portrait frame for desktop.
    const variants = {
      portrait: 'scale=720:-2',
      landscape: `crop=iw:iw*9/16:0:(ih-iw*9/16)*${v.cropY},scale=1280:-2`,
    };
    for (const [orient, filter] of Object.entries(variants)) {
      const base = path.join(VIDEO_OUT, `${v.name}-${orient}`);
      const vf = `${filter},fps=30,format=yuv420p`;
      // -an strips audio: the hero plays muted, so the track is dead weight.
      ffmpeg(['-i', src, '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'slow', '-b:v', `${kbps}k`,
        '-maxrate', `${kbps * 1.5}k`, '-bufsize', `${kbps * 3}k`, '-profile:v', 'high', '-movflags', '+faststart', `${base}.mp4`]);
      ffmpeg(['-i', src, '-vf', vf, '-an', '-c:v', 'libvpx-vp9', '-b:v', `${kbps}k`, '-crf', '34',
        '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', `${base}.webm`]);
      // Poster = first frame, so nothing jumps when playback starts.
      ffmpeg(['-i', src, '-vf', filter, '-frames:v', '1', '-q:v', '3', `${base}.jpg`]);
      for (const ext of ['mp4', 'webm', 'jpg']) {
        console.log(`${path.relative(ROOT, base)}.${ext}  ${mb((await stat(`${base}.${ext}`)).size)}`);
      }
    }
  }
}

const mb = (bytes) => `${(bytes / 1e6).toFixed(1)} MB`;

const only = process.argv[2];
if (only !== 'videos') await photos();
if (only !== 'photos') await videos();
