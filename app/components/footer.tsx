import Link from 'next/link';
import { Facebook, Linkedin, Instagram, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mx-auto">Impact Delivery Group</h1>
        </div>
        <div className="flex justify-center space-x-6 mb-10">
          <Link href="https://facebook.com" aria-label="Facebook">
            <div className="p-3 rounded-full transition-colors">
              <Facebook className="w-6 h-6" />
            </div>
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <div className="p-3 rounded-full transition-colors">
              <Linkedin className="w-6 h-6" />
            </div>
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <div className="p-3 rounded-full transition-colors">
              <Instagram className="w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* Legal Documents Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Disclaimer */}
            <div className="text-sm">
              <h3 className="font-semibold mb-2">Disclaimer</h3>
              <p className="text-gray-400">
                The transmission or receipt of information via this website does not establish a provider-client relationship between you and Impact Delivery Group, LLC (IDG).
              </p>
              <Link href="/disclaimer" className="text-blue-400 hover:underline mt-2 inline-block">
                Read Full Disclaimer
              </Link>
            </div>

            {/* Privacy Policy */}
            <div className="text-sm">
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p className="text-gray-400">
                We are committed to safeguarding your privacy. Learn how we collect, use, and protect your information.
              </p>
              <Link href="/privacy-policy" className="text-blue-400 hover:underline mt-2 inline-block">
                Read Privacy Policy
              </Link>
            </div>

            {/* Terms of Use */}
            <div className="text-sm">
              <h3 className="font-semibold mb-2">Terms of Use</h3>
              <p className="text-gray-400">
                By using this website, you agree to comply with our terms and conditions.
              </p>
              <Link href="/terms-of-use" className="text-blue-400 hover:underline mt-2 inline-block">
                Read Terms of Use
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center mb-8 text-gray-400">© 2025 Impact Delivery Group LLC. ALL RIGHTS RESERVED.</p>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">Privacy Notice</Link>
          <div className="flex items-center">
            <Link href="/privacy-choices" className="hover:underline">Your Privacy Choices</Link>
            <ShieldCheck className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
