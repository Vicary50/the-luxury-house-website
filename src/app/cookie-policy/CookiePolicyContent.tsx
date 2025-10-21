'use client';

import { PrinterIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/layout/Footer';

export default function CookiePolicyContent() {
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
                    Cookie Policy
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
                  This Cookie Policy contains information about how cookies and similar technical means are used on The Luxury House website(www.theluxuryhouse.uk), so that you can make an informed decision about whether and which cookies to allow or block.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What are cookies?</h2>
                <p className="mb-4">
                  A &ldquo;cookie&rdquo; is a small text file that is placed and stored on your computer, smartphone or other device or in browsers by websites or applications that you access. Cookies transmit small amounts of data about your device to our web server. They allow websites to recognise your computer, smartphone or other device when you browse the internet.
                </p>
                <p className="mb-6">
                  Tracking pixels, pixels, JavaScript and other tracking technologies also use cookies, invisible images or invisible codes that collect data about a user&apos;s visit to the website in a similar way to cookies. Depending on how long a cookie remains stored, we may refer to cookies as session cookies or persistent cookies:
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Session cookies</h3>
                <p className="mb-4">
                  A session cookie is deleted when you close the website in question. A session cookie allows a website to recognise you while you browse the website, but the cookie is deleted when you log out or close the website in your browser.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Permanent cookies</h3>
                <p className="mb-4">
                  A persistent cookie recognises you again and again for a set period of time. It remains stored on your device or in your browser for this period (which can be minutes, days or months) after you have logged out or closed the browser. Persistent cookies are used, for example, to store certain settings you have made on a website (such as your preferred language).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How does the luxury house use cookies?</h2>
                <p className="mb-4">
                  The Luxury House uses both session cookies and persistent cookies. Cookies and similar technical means are used by The Luxury House for a variety of reasons. Cookies are sometimes necessary for our website and certain features, such as shopping carts or secure logins, to work properly. Cookies allow us to count visitors to our website and learn how they use our website and its features, which helps us continually improve their user experience. Cookies can also enable us to tailor the content of a website to your preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies we use</h2>
                <p className="mb-4">
                  The cookies that may be used by The Luxury House on this website can be categorised as follows:
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Essential cookies</h3>
                <p className="mb-4">
                  These cookies are needed to ensure that this website functions properly and is secure so that you can navigate the website and use its features. At the same time, we store your preferences regarding our use of cookies on your device. Without these cookies, certain features of the website would not be available. You would also not be able to use certain services on the website. These cookies do not collect any of your data for marketing purposes and they are not used to monitor your activity on the internet generally.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Functional cookies</h3>
                <p className="mb-4">
                  These cookies allow a website to remember the options you have selected, and any custom settings you have made or personalisation options you have selected when browsing. It may also be used to provide you with certain services that you may use.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis and statistic cookies</h3>
                <p className="mb-4">
                  These cookies are used to monitor and improve the function and service of our website. They can also help us to identify problems you may encounter when using our online services. These cookies may be used to record visitor numbers and provide other website analytics metrics. These cookies are not used to provide you with targeted online advertising. Without these cookies, we have limited information about how well our website is performing and are limited in our ability to make necessary usability improvements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Details of the cookies potentially used</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Cookie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">_ga</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">Analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site&apos;s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">_gid</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">Analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website&apos;s performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">_gat_gtag_UA_*</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">Analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">Set by Google to distinguish users.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and cookies – Your personal data</h2>
                <p className="mb-4">
                  In certain cases, data from cookies can be used to create individual profiles, especially when combined with unique identifiers and other data received by servers. In such cases, the data collected may not be considered anonymous, but rather personal data that makes it possible to identify a specific individual. The Luxury House may combine the data we receive through cookies with data from other sources, such as affiliated websites. For those instances where The Luxury House holds personal data through the collection of data via cookies, please refer to our Privacy Policy for more information on how we use such personal data and your rights in this regard.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your options to control the use of cookies</h2>
                <p className="mb-4">
                  You have several options to control how cookies are used on your device or browser. You can be notified when cookies are set, you can delete cookies that have already been set and you can block all or only certain cookies. For more information about your available options, please visit{' '}
                  <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">
                    www.allaboutcookies.org
                  </a>
                  {' '}or{' '}
                  <a href="http://cookiepedia.co.uk/how-to-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">
                    http://cookiepedia.co.uk/how-to-manage-cookies
                  </a>.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800">
                    <strong>Please note:</strong> If you update your browser or change your settings or use an online link to reject cookies, these updates will only apply on the device on which you made the respective changes.
                  </p>
                </div>
                
                <p className="mb-4">
                  If you disable or block all cookies, The Luxury House website will not function properly. In addition, disabling or blocking cookies may mean that some features The Luxury House offers will not work as intended or that you will not have access to certain features or personalised settings.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser settings</h3>
                <p className="mb-4">
                  In most browser settings, you can choose to be notified when a cookie is set or updated, or you can restrict or block certain types of cookies or all cookies. See your browser help for more information.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Device settings</h3>
                <p className="mb-4">
                  In your device settings, you can also prohibit mobile app platforms (such as Apple or Google) from sharing with The Luxury House certain data that has been collected automatically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p className="mb-4">
                  If you have any concerns or questions about this Cookie Policy, please contact us at <a href="mailto:theluxuryhouseuk@gmail.com" className="text-amber-600 hover:text-amber-700 underline transition-colors duration-200">theluxuryhouseuk@gmail.com</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time.
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