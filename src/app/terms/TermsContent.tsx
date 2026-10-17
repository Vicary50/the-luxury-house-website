'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/layout/PageHeader';
import PrintButton from '@/components/ui/PrintButton';
import SignaturePad from '@/components/ui/SignaturePad';
import { jsPDF } from 'jspdf';

export default function TermsContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [signature, setSignature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature) {
      alert('Please provide your signature.');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Generate PDF directly using Text (to avoid HTML2Canvas CSS issues)
      const doc = new jsPDF('p', 'mm', 'a4');
      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - (margin * 2);
      let yPos = 30;

      const addText = (text: string, fontSize = 11, isBold = false, marginBottom = 5) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = doc.splitTextToSize(text, contentWidth);
        const textHeight = (lines.length * fontSize * 0.352778) + marginBottom;

        if (yPos + textHeight > 280) {
          doc.addPage();
          yPos = 20;
        }

        doc.text(lines, margin, yPos);
        yPos += textHeight;
      };

      // Header
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('THE LUXURY HOUSE', margin, yPos);
      yPos += 10;
      doc.setFontSize(14);
      doc.text('TERMS AND CONDITIONS', margin, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Effective Date: January 2026', margin, yPos);
      yPos += 15;

      // Content Sections
      addText('1. PARTIES AND AGREEMENT', 14, true, 8);
      addText('These Terms and Conditions (“Terms”) form a legally binding contract between the owner of The Luxury House (referred to as “we,” “us,” “our,” or “the Property Owner”) and the person making the booking (“you,” “your,” or “the Lead Guest”).', 11, false, 6);
      addText('By making this booking, you confirm that you are at least 21 years of age and have the authority to enter into this agreement on behalf of everyone in your party. You also confirm that you have read, understood, and agreed to these terms and conditions, and that you will ensure all members of your party comply with them. You understand your cancellation and refund rights, and you acknowledge that you have been provided with all the necessary pre-contract information.', 11, false, 6);
      addText('These Terms comply with the Consumer Rights Act 2015, Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, and relevant UK consumer protection legislation.', 11, false, 12);

      addText('2. BOOKING PROCESS AND CONFIRMATION', 14, true, 8);
      addText('2.1 Booking Confirmation', 12, true, 5);
      addText('A booking becomes legally binding when you receive our written booking confirmation and pay the required booking deposit.', 11, false, 6);
      addText('2.2 Information Accuracy', 12, true, 5);
      addText('You must ensure all information provided is accurate and complete. Any changes must be notified immediately and may be subject to additional charges or availability.', 11, false, 12);

      addText('3. PAYMENT TERMS', 14, true, 8);
      addText('3.1 Deposit Requirements', 12, true, 5);
      addText('• Booking Deposit: £1,000 (non-refundable)', 11, false, 3);
      addText('• Security Deposit: £500 (refundable)', 11, false, 6);
      addText('3.2 Balance Payment', 12, true, 5);
      addText('Full balance is due 30 calendar days before your arrival date. Failure to pay the balance by the due date constitutes cancellation of your booking. We reserve the right to re-let the property and retain the booking deposit.', 11, false, 6);
      addText('3.3 Security Deposit', 12, true, 5);
      addText('The security deposit covers accidental damage, additional cleaning, missing items, or breach of terms. Refunds are processed within 7 calendar days of departure following inspection.', 11, false, 12);

      addText('4. CANCELLATION AND REFUND POLICY', 14, true, 8);
      addText('4.1 Guest Cancellations', 12, true, 5);
      addText('• More than 30 days before arrival: Booking deposit retained; security deposit and balance refunded.', 11, false, 4);
      addText('• Less than 30 days before arrival: Booking deposit and balance retained; security deposit refunded.', 11, false, 8);
      addText('4.2 Property Owner Cancellations', 12, true, 5);
      addText('In the unlikely event we must cancel, you receive a full refund of all payments made.', 11, false, 12);

      addText('5. CHECK-IN AND CHECK-OUT', 14, true, 8);
      addText('Check-in is from 3:00 PM; Check-out is by 11:00 AM. Detailed instructions provided 48 hours before arrival.', 11, false, 12);

      addText('6. OCCUPANCY AND PROPERTY USE', 14, true, 8);
      addText('Maximum occupancy is 16 people (14 adults and 2 children under 12). Unauthorized additional guests may result in immediate termination of booking. Quiet hours are 10:00 PM to 8:00 AM. Smoking and pets are strictly prohibited.', 11, false, 12);

      addText('7. PROPERTY FACILITIES AND SAFETY', 14, true, 8);
      addText('Use of pool, sauna, and fire pit is at guests\' own risk. No lifeguard on duty. Children must be supervised at all times. No glass in pool area.', 11, false, 12);

      addText('8. GUEST RESPONSIBILITIES', 14, true, 8);
      addText('Guests must treat the property with care, use appliances properly, and report damage immediately. Please leave the property clean and tidy upon departure.', 11, false, 12);

      // Execution Page
      doc.addPage();
      yPos = 30;
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTION & AGREEMENT', margin, yPos);
      yPos += 20;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Lead Guest: ${name}`, margin, yPos);
      yPos += 10;
      doc.text(`Email: ${email}`, margin, yPos);
      yPos += 10;
      doc.text(`Date Signed: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, margin, yPos);
      yPos += 20;

      doc.text('Digital Signature:', margin, yPos);
      yPos += 10;
      doc.addImage(signature, 'PNG', margin, yPos, 80, 30);
      yPos += 40;

      doc.setFontSize(10);
      doc.text('I confirm that I have read, understood, and agree to be bound by these Terms and Conditions.', margin, yPos);

      const pdfBlob = doc.output('blob');

      // 2. Submit to our Resend-backed API route
      const formPacket = new FormData();
      formPacket.append('Name', name);
      formPacket.append('email', email);
      formPacket.append('Date Signed', new Date().toLocaleString('en-GB'));
      formPacket.append('Signed_Terms_PDF', pdfBlob, 'Signed_Terms.pdf');

      const response = await fetch('/api/sign-terms', {
        method: 'POST',
        body: formPacket
      });

      const result = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Sign-terms error:', result);
        alert(result.error || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Submission error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms and conditions" intro={<p>Effective date: January 2026</p>}>
        <PrintButton />
      </PageHeader>

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 print:max-w-none print:p-0">
        <div className="prose-editorial">
        <section>
          <h2>1. Parties and agreement</h2>
          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) form a legally binding contract between the owner of The Luxury House (referred to as &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Property Owner&rdquo;) and the person making the booking (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;the Lead Guest&rdquo;).
          </p>

          <p>
            By making this booking, you confirm that you are at least 21 years of age and have the authority to enter into this agreement on behalf of everyone in your party. You also confirm that you have read, understood, and agreed to these terms and conditions, and that you will ensure all members of your party comply with them. You understand your cancellation and refund rights, and you acknowledge that you have been provided with all the necessary pre-contract information.
          </p>

          <p>
            These Terms comply with the <strong>Consumer Rights Act 2015</strong>, <strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong>, and relevant UK consumer protection legislation.
          </p>
        </section>

        <section>
          <h2>2. Booking process and confirmation</h2>

          <h3>2.1 Booking Confirmation</h3>
          <p>A booking becomes legally binding when:</p>
          <ul>
            <li>You receive our written booking confirmation</li>
            <li>You pay the required booking deposit</li>
          </ul>

          <h3>2.2 Information Accuracy</h3>
          <p>
            You must ensure all information provided is accurate and complete. Any changes must be notified immediately and may be subject to additional charges or availability.
          </p>
        </section>

        <section>
          <h2>3. Payment terms</h2>

          <h3>3.1 Deposit Requirements</h3>
          <ul>
            <li><strong>Booking Deposit:</strong> £1,000 (non-refundable)</li>
            <li><strong>Security Deposit:</strong> £500 (refundable, see Section 3.3)</li>
          </ul>

          <h3>3.2 Balance Payment</h3>
          <ul>
            <li>Full balance is due <strong>30 calendar days</strong> before your arrival date</li>
            <li>Failure to pay the balance by the due date constitutes cancellation of your booking</li>
            <li>We reserve the right to re-let the property and retain the booking deposit</li>
          </ul>

          <h3>3.3 Security Deposit</h3>
          <p>The security deposit covers:</p>
          <ul>
            <li>Accidental damage to property or contents</li>
            <li>Additional cleaning beyond normal requirement</li>
            <li>Missing items or equipment</li>
            <li>Breach of these Terms & Conditions resulting in additional costs</li>
          </ul>

          <p><strong>Refund Process:</strong></p>
          <p>
            We&apos;ll refund your security deposit within 7 calendar days of your departure, following a property inspection and inventory check. If damage assessment by a specialist contractor is needed, your refund may be delayed, and we&apos;ll inform you. Any deductions made will be itemized and communicated to you. Please note, any disputes regarding deductions must be raised within 7 calendar days of receiving our notification.
          </p>

          <h3>3.4 Payment Methods</h3>
          <ul>
            <li>All payments must be made in British Pounds Sterling</li>
            <li>Payment processing fees, if any, will be disclosed</li>
          </ul>
        </section>

        <section>
          <h2>4. Cancellation and refund policy</h2>

          <h3>4.1 Guest Cancellations</h3>

          <div className="callout">
            <p className="font-medium text-ink">More than 30 days before arrival:</p>
            <p>
              If you cancel your booking more than 30 days before your arrival, you will be refunded your security deposit and any balance payment you have already made. Please note that the initial booking deposit is non-refundable and will be retained by us.
            </p>
          </div>

          <div className="callout">
            <p className="font-medium text-ink">Less than 30 days before arrival:</p>
            <p>
              If you cancel your booking less than 30 days before your arrival, you will be refunded your security deposit. The booking deposit and balance payment will be retained by us.
            </p>
          </div>

          <h3>4.2 Property Owner Cancellations</h3>
          <p>
            In the unlikely event we must cancel your booking, you will receive a full refund of all payments made. We cannot, however, compensate for any additional costs you may have incurred.
          </p>

          <h3>4.3 Force Majeure</h3>
          <p>
            See Section 13 for cancellations due to circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2>5. Check-in and check-out</h2>

          <h3>5.1 Arrival and Departure Times</h3>
          <ul>
            <li><strong>Check-in:</strong> From 3:00 PM on arrival date</li>
            <li><strong>Check-out:</strong> By 11:00 AM on departure date</li>
            <li><strong>Late check-out:</strong> Available by prior arrangement - please let us know if you need this and we&apos;ll try to accommodate</li>
          </ul>

          <h3>5.2 Access Instructions</h3>
          <ul>
            <li>Detailed access instructions provided 48 hours before arrival</li>
            <li>Emergency contact number available 24/7</li>
            <li><strong>Key/Fob Charges:</strong>
              <ul>
                <li>Lost keys: £25</li>
                <li>Lost gate fob: £50</li>
                <li>Replacement service call-out: £75</li>
              </ul>
            </li>
          </ul>

          <h3>5.3 Property Handover</h3>
          <p>
            Please report any existing damage or issues within 3 hours of your arrival. If you don&apos;t report them, you may be held responsible and charged for the damages.
          </p>
        </section>

        <section>
          <h2>6. Occupancy and property use</h2>

          <h3>6.1 Guest Numbers</h3>
          <p>
            The maximum occupancy for this property is 16 people (14 adults and 2 children under 12). To ensure a smooth stay, all guests must be listed on the booking form with their full names and ages. If you want to add more guests, you must get prior written approval, and a surcharge may apply. Please note that unauthorized additional guests may result in the immediate termination of your booking and require you to vacate the property.
          </p>

          <h3>6.2 Age Restrictions</h3>
          <p>
            We do not allow groups consisting entirely of people under the age of 25. Additionally, all children under 16 must be supervised at all times.
          </p>

          <h3>6.3 Prohibited Activities</h3>
          <p>
            To ensure a comfortable and safe experience for everyone, the following activities are strictly forbidden on the property:
          </p>
          <ul>
            <li>Parties, events, or gatherings that exceed the number of guests on your booking</li>
            <li>Smoking anywhere on the property. A £500 penalty charge will be applied if this rule is broken</li>
            <li>Bringing pets of any kind</li>
            <li>Any illegal activities or drug use</li>
            <li>Excessive noise, particularly during our quiet hours from 10:00 PM to 8:00 AM</li>
            <li>Commercial activities or filming without prior consent</li>
          </ul>

          <div className="callout">
            <h4>Enforcement</h4>
            <p>
              Please note that failure to follow these rules may result in the immediate termination of your stay without a refund, and could lead to additional fees. You will also be required to vacate the property immediately.
            </p>
          </div>

          <h3>6.4 Noise and Neighbour Considerations</h3>
          <p>
            To ensure a peaceful environment for everyone, our quiet hours are from 10:00 PM to 8:00 AM. During this time, please be mindful of our neighbours by keeping noise to a minimum and refraining from playing amplified music outdoors.
          </p>
          <p>
            For the security of the property and for noise control, please make sure the gates are closed at all times.
          </p>
        </section>

        <section>
          <h2>7. Property facilities and safety</h2>

          <h3>7.1 Swimming Pool</h3>

          <div className="callout">
            <h4>Swimming Pool Rules & Safety Guidelines</h4>
            <p>
              By using the swimming pool, you acknowledge and agree to the following rules, which are in place for your safety and to maintain the quality of the pool area.
            </p>

            <p>
              <strong>Your safety is your responsibility.</strong> Use of the pool is at your own risk. There is no lifeguard on duty, and the host is not liable for any injuries, accidents, or fatalities. Children and non-swimmers must be supervised by a responsible adult at all times.
            </p>

            <p className="font-medium text-ink">To ensure a safe and clean environment:</p>
            <ul>
              <li>No diving, running, or rough play in or around the pool area</li>
              <li>Wear suitable swimming attire only; regular clothing is not permitted in the pool</li>
              <li>Do not bring any glass containers into the pool area. For your safety, we have provided plastic alternatives</li>
              <li>Food and drinks should not be consumed in the pool</li>
              <li>Please shower before entering the pool to help maintain water quality</li>
              <li>Never enter the pool under the influence of alcohol or drugs, as this creates a serious safety risk</li>
              <li>Do not add anything to the pool, such as soap or oils, as this can affect the water&apos;s chemical balance</li>
              <li>Dry off completely before re-entering the house to protect the floors and furniture</li>
              <li>Only use the designated pool towels provided. Please do not take indoor towels outside</li>
            </ul>

            <p className="font-medium text-ink">Other important information:</p>
            <ul>
              <li>The pool is open from 8:00 AM to 10:00 PM. Swimming outside of these hours is strictly prohibited for safety and noise considerations</li>
              <li>We are not responsible for any personal items that are lost or damaged near the pool</li>
              <li>You are financially responsible for any damage to the pool or equipment due to misuse or negligence, as well as any extra cleaning fees</li>
              <li>Please keep the back door locked when the pool is in use for child safety</li>
              <li>Do not tamper with the pool cover or any safety equipment</li>
              <li>If you notice any maintenance issues with the pool, please report them immediately</li>
            </ul>
          </div>

          <h3>7.2 Sauna</h3>
          <div className="callout">
            <p className="font-medium text-ink">To ensure a safe and enjoyable experience for everyone, please follow these rules when using the sauna:</p>
            <ul>
              <li>This facility is for adults aged 18 and older only</li>
              <li>Limit your sessions to a maximum of 25 minutes for your safety</li>
              <li>Always shower before use and sit on a towel to protect the wood</li>
              <li>Be sure to read and follow all posted safety instructions</li>
              <li>The sauna is not suitable for pregnant women or individuals with certain medical conditions</li>
            </ul>
          </div>

          <h3>7.3 Fire Pit</h3>
          <div className="callout">
            <p className="font-medium text-ink">To ensure everyone&apos;s safety, please follow these rules when using the fire pit:</p>
            <ul>
              <li>Adult supervision is required at all times</li>
              <li>Only use the materials we&apos;ve provided for the fire pit</li>
              <li>Do not roast any food over the fire</li>
              <li>When you&apos;re finished, be sure to switch off the gas and fully extinguish the fire before leaving it unattended</li>
              <li>Do not use the fire pit during windy conditions or when local fire restrictions are in place</li>
            </ul>
          </div>

          <h3>7.4 General Safety</h3>
          <ul>
            <li>First aid kit location will be provided</li>
            <li>Report any safety concerns immediately</li>
          </ul>
        </section>

        <section>
          <h2>8. Guest responsibilities</h2>

          <h3>8.1 Property Care</h3>
          <p>You must:</p>
          <ul>
            <li>Treat the property with care and respect - please treat our home with the same care you would your own</li>
            <li>Use appliances and equipment properly</li>
            <li>Report any damage or malfunctions immediately - if something gets damaged or broken, let us know right away</li>
            <li>Not move or rearrange furniture without permission</li>
            <li>Not remove anything from the property</li>
            <li>Avoid using adhesive materials on walls (cellotape, blu-tac, etc.)</li>
          </ul>

          <h3>8.2 Playroom and Family Areas</h3>
          <ul>
            <li>This is our family home - toys, books and games must remain in the playroom</li>
            <li>These items are provided for your enjoyment during your stay</li>
            <li>Please ensure children are supervised when using play areas</li>
          </ul>

          <h3>8.3 Cleaning and Maintenance</h3>
          <p>
            To help us prepare for our next guests, please leave the property in a clean and tidy condition when you check out.
          </p>
          <div className="callout">
            <p className="font-medium text-ink">Before you leave, we kindly ask that you:</p>
            <ul>
              <li>Leave any used towels in the bathroom</li>
              <li>Load and run the dishwasher with any dirty dishes</li>
              <li>Take all trash out to the designated bins</li>
              <li>Return the keys and gate fobs to the welcome basket</li>
            </ul>
          </div>
          <p>
            Please be aware that excessive mess may result in additional cleaning charges.
          </p>

          <h3>8.4 Utilities and Services</h3>
          <ul>
            <li>Report any utility failures immediately</li>
            <li>Use heating and air conditioning responsibly</li>
            <li><strong>Free laundry facilities:</strong> Washing machine and dryer are free to use during your stay</li>
            <li><strong>Ironing facilities:</strong> Iron, ironing board and pull-out drying rail available in utility room</li>
            <li><strong>Electric vehicle charging:</strong> Free EV charger available for guest use</li>
          </ul>
        </section>

        <section>
          <h2>9. Damages and liability</h2>

          <h3>9.1 Property Damage</h3>
          <p>
            Please report any damage immediately, regardless of how it happened. While minor accidental damage is covered by your security deposit, significant damage or negligence may result in additional charges. We also reserve the right to seek the full cost of replacement.
          </p>

          <h3>9.2 Personal Property</h3>
          <p>
            We accept no responsibility for guests&apos; personal belongings
          </p>

          <h3>9.3 Personal Injury and Accidents</h3>
          <p>
            Under the Occupiers&apos; Liability Act 1957 and Occupiers&apos; Liability Act 1984:
          </p>
          <ul>
            <li>Guests use all facilities at their own risk</li>
            <li>We maintain appropriate safety measures and insurance</li>
            <li>Guests must report any accidents immediately</li>
            <li>Liability is limited as set out in Section 12</li>
          </ul>
        </section>

        <section>
          <h2>10. Privacy and data protection</h2>

          <h3>10.1 Data Protection</h3>
          <p>
            We comply with the General Data Protection Regulation (GDPR) and Data Protection Act 2018:
          </p>
          <ul>
            <li>Personal data used only for booking and safety purposes</li>
            <li>Information may be shared with local authorities if required by law</li>
            <li>Data retention period: 5 years for tax purposes</li>
            <li>Full privacy policy available upon request</li>
          </ul>

          <h3>10.2 Photography and Marketing</h3>
          <p>
            Guests are not permitted to use images of the property for any commercial purposes.
          </p>

          <h3>10.3 Security Cameras</h3>
          <div className="callout">
            <p>
              For your safety and for insurance purposes, security cameras are installed at the front door and in the back garden. These outdoor cameras are used solely to monitor the exterior of the property and ensure a safe, secure environment for all guests. <strong>No cameras are installed inside the property or in any private areas.</strong>
            </p>
          </div>
        </section>

        <section>
          <h2>11. Property access by owner</h2>

          <h3>11.1 Emergency Access</h3>
          <p>
            We reserve the right to access the property in genuine emergencies that threaten safety or the property itself, for essential maintenance, or to verify guest numbers if we suspect unauthorised guests. If unauthorised guests are found, we reserve the right to immediately terminate the booking without a refund and you will be required to vacate the property.
          </p>

          <h3>11.2 Maintenance and Inspections</h3>
          <p>
            We reserve the right to perform emergency repairs if they become necessary during your stay.
          </p>
        </section>

        <section>
          <h2>12. Limitation of liability</h2>

          <h3>12.1 Our Liability to You</h3>
          <p>
            Subject to Section 12.2, our total liability is limited to the total amount paid for your booking.
          </p>

          <h3>12.2 Exclusions</h3>
          <p>
            We are not liable for any loss of enjoyment or disappointment you may experience, nor for any consequential or indirect losses. Our liability does not extend to any losses that result from your breach of these terms and conditions, or to issues arising from weather conditions that affect your stay. Additionally, we are not responsible for any services or activities provided by third parties.
          </p>

          <h3>12.3 Vehicle Security</h3>
          <p>
            All vehicles are parked at owners&apos; risk. We accept no responsibility for vehicle damage or theft.
          </p>
        </section>

        <section>
          <h2>13. Force majeure</h2>

          <h3>13.1 Definition</h3>
          <p>
            &ldquo;Force Majeure&rdquo; includes circumstances beyond our reasonable control:
          </p>
          <ul>
            <li>Acts of God (natural disasters, severe weather)</li>
            <li>Government restrictions or lockdowns</li>
            <li>Public health emergencies</li>
            <li>War, terrorism, or civil unrest</li>
            <li>Utility failures not caused by our negligence</li>
          </ul>

          <h3>13.2 Effect of Force Majeure</h3>
          <p>
            In the event that an unforeseen and uncontrollable event (a &ldquo;Force Majeure&rdquo; event) prevents your stay, we will provide a full refund of all payments made.
          </p>
          <p>
            If a Force Majeure event occurs during your stay and makes it impossible to continue, you will receive a prorated refund for any unused nights.
          </p>
          <p>
            In both cases, we are not liable for any additional or consequential losses you may incur, such as travel costs or loss of enjoyment. We will, however, do our best to offer alternative dates if possible.
          </p>
        </section>

        <section>
          <h2>14. Complaints and dispute resolution</h2>

          <h3>14.1 Complaints Procedure</h3>
          <p>
            Please report any issues or concerns to us immediately so we can try to resolve them within 24 hours.
          </p>
          <p>
            If you have a formal complaint, you must submit it in writing within 7 days of your departure. We will respond to your complaint within 30 working days
          </p>
        </section>

        <section>
          <h2>15. General provisions</h2>

          <h3>15.1 Entire Agreement</h3>
          <p>
            These Terms constitute the entire agreement between the parties and supersede all prior negotiations, representations, or agreements.
          </p>

          <h3>15.2 Modifications</h3>
          <ul>
            <li>Changes must be in writing and signed by both parties</li>
            <li>We may update Terms for future bookings</li>
          </ul>

          <h3>15.3 Severability</h3>
          <p>
            If any provision is found unenforceable, the remainder of these Terms remains in full effect.
          </p>

          <h3>15.4 Governing Law</h3>
          <p>
            These Terms are governed by the laws of England and Wales. Courts of England and Wales have exclusive jurisdiction.
          </p>

          <h3>15.5 Consumer Rights</h3>
          <p>
            These Terms do not affect your statutory rights as a consumer under UK law.
          </p>
        </section>
        </div>

        <section id="sign" className="mt-20 border-t border-ink pt-12 print:hidden">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Acknowledgment</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.05] text-ink">
            Sign the terms
            <em className="block font-light">before you arrive.</em>
          </h2>

          {isSuccess ? (
            <div role="status" className="mt-10 border-l-2 border-olive bg-stone p-8">
              <CheckCircleIcon aria-hidden="true" className="h-10 w-10 text-olive" />
              <h3 className="mt-4 font-display text-2xl text-ink">Terms signed</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-muted">
                Thank you, {name}. A copy of your signed agreement has been sent to the property owner, and a copy has been emailed to you at {email}.
              </p>
              <p className="mt-4 text-sm text-muted">
                Date signed: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          ) : (
            <>
              <p className="mt-8 text-[1.0625rem] font-medium text-ink">By signing below, you acknowledge and agree that:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.75] text-muted marker:text-olive">
                <li>You have read and understood these Terms and Conditions</li>
                <li>You agree to be bound by these Terms</li>
                <li>You will ensure all members of your party comply with these Terms</li>
                <li>You understand your cancellation and refund rights</li>
                <li>You have been provided with all required pre-contract information</li>
              </ul>

              <form onSubmit={handleSubmit} className="mt-12 space-y-8 border border-hairline bg-stone p-6 sm:p-10">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium uppercase tracking-[0.15em] text-ink">
                    Full name of lead guest
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="mt-3 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-muted/70 focus:border-olive focus:outline-none focus:ring-0"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="block text-xs font-medium uppercase tracking-[0.15em] text-ink">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    aria-describedby="emailHelp"
                    className="mt-3 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-muted/70 focus:border-olive focus:outline-none focus:ring-0"
                    placeholder="Your email address"
                  />
                  <p id="emailHelp" className="mt-2 text-sm text-muted">
                    A copy of the signed agreement will be sent to this email.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink">Digital signature</p>
                  <div className="mt-3">
                    <SignaturePad onSave={setSignature} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !signature}
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-[2px] bg-olive px-8 text-sm font-medium tracking-[0.12em] text-white uppercase transition-colors duration-300 hover:bg-olive-deep disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg aria-hidden="true" className="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Agree & submit'}
                </button>

                <p className="text-center text-sm text-muted">
                  Dated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
