'use client';

import { PrinterIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyContent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            background: white !important;
          }
          .bg-gray-50 {
            background: white !important;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
          .rounded-lg {
            border-radius: 0 !important;
          }
          .py-12 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .px-4, .px-6, .px-8 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
          }
          .mx-auto {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 py-12 print:py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-full print:mx-0 print:px-0">
          <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:rounded-none">
            <header className="text-center mb-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1"></div>
                <div className="flex-1 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Privacy Policy
                  </h1>
                </div>
                <div className="flex-1 flex justify-end">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 print:hidden"
                    title="Print this page"
                  >
                    <PrinterIcon className="w-5 h-5 mr-2" />
                    Print Page
                  </button>
                </div>
              </div>
            </header>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                  With this privacy policy we inform you about our handling of your personal data and about your rights according to the UK&apos;s Data Protection Act (DPA) and the General Data Protection Regulation (GDPR). Responsible for data processing is Phenol Skin Peel (hereinafter referred to as &ldquo;we&rdquo; or &ldquo;us&rdquo;).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p className="mb-4">
                  If you have any questions or suggestions regarding this policy or would like to contact us about asserting your rights, please send your request to:
                </p>
                <p className="mb-4 font-medium">
                  <a 
                    href="mailto:theluxuryhouseuk@gmail.com" 
                    className="text-amber-600 hover:text-amber-700 underline transition-colors duration-200"
                  >
                    theluxuryhouseuk@gmail.com
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal basis</h2>
                <p className="mb-4">
                  The term &ldquo;personal data&rdquo; under data protection law refers to all information relating to a specific or identifiable individual. We process personal data in compliance with the relevant data protection regulations, in particular the DPA and the GDPR.
                </p>
                <p className="mb-4">
                  Data processing by us only takes place on the basis of legal permission. We process personal data only with your consent (Art. 6 (1) a GDPR), for the performance of:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>a contract to which you are a party (Art. 6 (1) b GDPR), or</li>
                  <li>at your request for the performance of pre-contractual measures (Art. 6 (1) b GDPR),</li>
                  <li>for the performance of a legal obligation (Art. 6(1)(c) GDPR), or</li>
                  <li>if the processing is necessary to protect our legitimate interests or the legitimate interests of a third party, unless your interests or fundamental rights and freedoms which require the protection of personal data override (Art. 6(1)(f) GDPR).</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Duration of storage</h2>
                <p className="mb-4">
                  Unless otherwise stated in the following notes, we only store data for as long as is necessary to achieve the purpose of processing or to fulfil our contractual or legal obligations. In addition, we will retain data in connection with consents requiring proof, as well as with complaints and claims for the duration of the statutory limitation periods. We will delete data stored for advertising purposes if you object to processing for this purpose.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third Party Processors</h2>
                <p className="mb-4">
                  We use processors as part of the processing of your data. Processing operations carried out by such processors include, for example, hosting, emailing, IT system maintenance and support, Customer Relationship Management software, marketing activities or file and data carrier destruction. A processor is a natural or legal person, public authority, agency or other body that processes personal data on behalf of the data controller. Processors do not use the data for their own purposes but carry out data processing exclusively for the data controller and are contractually obliged to guarantee appropriate technical and organisational measures for data protection.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Transfer of personal data to commercial partners</h2>
                <p className="mb-4">
                  The Luxury House will not disclose or otherwise distribute your personal data to third parties unless:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>this is necessary for the performance of our services (legal basis for processing: Art. 6 para. 1 lit. b) GDPR),</li>
                  <li>you have consented to the disclosure (legal basis for processing: Art. 6 para. 1 lit. a) GDPR) or</li>
                  <li>the disclosure of data is permitted by relevant legal provisions.</li>
                </ul>
                <p className="mb-4">
                  The commercial partners commissioned by The Luxury House process your data exclusively in accordance with our instructions. The Luxury House remains responsible for the protection of your data, which is ensured by strict contractual regulations, technical and organisational measures, and additional controls by us. For further information please request our Processing addendum.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclosure due to a legal obligation</h2>
                <p className="mb-4">
                  Personal data may also be disclosed to third parties if we are legally obliged to do so e.g., by court order (legal basis for processing: Art. 6 (1) (c) GDPR) or if this is necessary to support criminal or legal investigations or other legal investigations or proceedings at home or abroad or to fulfil The Luxury House legitimate interests (legal basis for processing: Art. 6 (1) (f) GDPR).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data transfer to third countries</h2>
                <p className="mb-4">
                  Our data processing operations are carried out typically within the United Kingdom only. However, they may involve the transfer of certain personal data to third countries, i.e., countries where the DPA/GDPR is not applicable law. Such a transfer is permissible if an adequate level of data protection is warranted in such third country pursuant to Art. 46 GDPR are in place or if one of the conditions of Art. 49 GDPR is met.
                </p>
                <p className="mb-4">
                  Unless otherwise stated below, we use the standard data protection clauses as appropriate safeguards for the transfer of personal data to third countries.
                </p>
                <p className="mb-4">
                  If you consent to the transfer of personal data to third countries, the transfer will take place on the legal basis of Article 49(1)(a) of the GDPR for example the use of Google Analytics on our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your rights</h2>
                <p className="mb-4">
                  As a data subject, you have the right to assert your data subject rights against us. In particular, you have the following rights:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>In accordance with Article 15 of the GDPR, you have the right to request information about whether or not we process personal data relating to you and, if so, to what extent.</li>
                  <li>You have the right to demand that we correct your data in accordance with Article 16 of the GDPR.</li>
                  <li>You have the right to demand that we delete your personal data in accordance with Art. 17 GDPR.</li>
                  <li>You have the right to have the processing of your personal data restricted in accordance with Art. 18 GDPR.</li>
                  <li>You have the right, in accordance with Art. 20 GDPR, to receive the personal data concerning you that you have provided to us in a structured, common and machine-readable format and to transfer this data to another controller.</li>
                  <li>If you have given us separate consent to data processing, you may revoke this consent at any time in accordance with Art. 7 (3) of the GDPR.</li>
                  <li>If you are of the opinion that a processing of personal data concerning you violates the provisions of the GDPR, you have the right to lodge a complaint with a supervisory authority in accordance with Art. 77 of the GDPR.</li>
                  <li>In accordance with Article 21(1) of the GDPR, you have the right to object to processing based on the legal basis of Article 6(1)(e) or (f) of the GDPR on grounds relating to your particular situation.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Supervisory Authority</h2>
                <p className="mb-4">
                  The Information Commissioner&apos;s Office (ICO) is the for The Luxury House relevant authority in matters of data protection. You have the right to make a complaint at any time to the ICO (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO in the first instance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data processing on our website</h2>
                <p className="mb-4">
                  When you use the website, we collect information that you provide yourself. In addition, during your visit to the website, we automatically collect certain information about your use of the website. In data protection law, the IP address is also generally considered to be a personal data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hosting</h2>
                <p className="mb-4">
                  We use a web hosting provider based in the UK to display and host our website. Insofar as this involves the processing of personal data relating to the use of our website, our hosting provider is our processor.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Server log files</h2>
                <p className="mb-4">
                  During the purely informative use of our website, general information that your browser transmits to our server is initially stored automatically. This includes by default: browser type/version, operating system used, page accessed, the previously visited page (referrer URL), IP address, date and time of the server request and HTTP status code.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacting us</h2>
                <p className="mb-4">
                  When you contact us by telephone or e-mail, the data you provide will be stored by us based on Art. 6 (1) lit. b of the GDPR, insofar as it is necessary to answer your questions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p className="mb-4">
                  We use cookies and comparable technologies (&ldquo;cookies&rdquo;) on our website. Cookies are small data sets that are stored by your browser when you visit a website. The use of cookies is partly technically necessary for the operation of our website and thus permissible without the user&apos;s consent.
                </p>
                <p className="mb-4">
                  For more information about the cookies please refer to our Cookie Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Google Analytics</h2>
                <p className="mb-4">
                  We use the Google Analytics service on our website. Google Analytics is a web analytics service that enables us to collect and analyse data about the behaviour of visitors to our website. The setting of cookies and the processing of personal data takes place with your consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Security and confidentiality</h2>
                <p className="mb-4">
                  To ensure the security and confidentiality of the personal data we collect on the Website, we use data networks that are protected by, among other things, industry-standard firewalls and password systems. When handling your personal information, we take appropriate technical and organisational measures to protect your information from loss, misuse, unauthorised access, disclosure, alteration or destruction and to ensure its availability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal data and children</h2>
                <p className="mb-4">
                  The services available on this website are exclusively aimed at people aged 18 and over. We do not provide services to minors under the age of 18. We will not knowingly collect, use or disclose personal information from minors under the age of 18.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes and updates to the privacy policy</h2>
                <p className="mb-4">
                  We kindly ask you to regularly inform yourself about the content of our privacy policy. We will amend the privacy policy as soon as changes to the data processing activities we carry out make this necessary.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Concerns and Contact</h2>
                <p className="mb-4">
                  If you have any concerns about a possible compromise of your privacy or misuse of your personal data on our part, or any other questions or comments, you can contact us at <a href="mailto:theluxuryhouseuk@gmail.com" className="text-amber-600 hover:text-amber-700 underline transition-colors duration-200">theluxuryhouseuk@gmail.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}