// src/components/dashboard/Contact.jsx
import { useState, useEffect } from "react";
import { usePortfolio } from "@/context/portfolioContext";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit } from "react-icons/fi";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Contact() {
  const { portfolio, updatePortfolio, fetchPortfolio } = usePortfolio();
  const contact = portfolio?.contactId || null;

  const [loading, setLoading] = useState(false);
  const [editingContact, setEditingContact] = useState(false);

  const [formData, setFormData] = useState({
    linkedinUrl: "",
    githubUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    facebookUrl: "",
    instaUrl: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        linkedinUrl: contact.linkedinUrl || "",
        githubUrl: contact.githubUrl || "",
        twitterUrl: contact.twitterUrl || "",
        youtubeUrl: contact.youtubeUrl || "",
        facebookUrl: contact.facebookUrl || "",
        instaUrl: contact.instaUrl || "",
      });
    }
  }, [contact]);

 
  const handleSaveContact = async () => {
    if (!contact) return;
    setLoading(true);
    try {
      const res = await api.put(`/contact/update-contact/${contact._id}`, formData, {
        withCredentials: true,
      });
      // Update portfolio context
      //   updatePortfolio({ contactId: res.data });
      fetchPortfolio();
      setEditingContact(false);
    } catch (err) {
      console.error("Failed to update contact", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-16 md:mb-0 space-y-6">
      <h1 className="text-3xl font-bold">Manage Contact Details</h1>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Contact Links</h2>
          <Button variant="outline" onClick={() => setEditingContact(true)}>
            <FiEdit className="mr-2" /> Edit Contact
          </Button>
        </div>
        {contact ? (
          <ul className="space-y-3 text-sm text-gray-700">
            {contact.linkedinUrl && (
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-blue-600 text-xl" />
                <span className="font-medium text-gray-800">LinkedIn:</span>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline hover:text-blue-700 transition-all"
                >
                  {contact.linkedinUrl}
                </a>
              </li>
            )}

            {contact.githubUrl && (
              <li className="flex items-center gap-3">
                <FaGithub className="text-gray-800 text-xl" />
                <span className="font-medium text-gray-800">GitHub:</span>
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-800 hover:underline hover:text-black transition-all"
                >
                  {contact.githubUrl}
                </a>
              </li>
            )}

            {contact.twitterUrl && (
              <li className="flex items-center gap-3">
                <FaTwitter className="text-sky-500 text-xl" />
                <span className="font-medium text-gray-800">Twitter:</span>
                <a
                  href={contact.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-500 hover:underline hover:text-sky-600 transition-all"
                >
                  {contact.twitterUrl}
                </a>
              </li>
            )}

            {contact.youtubeUrl && (
              <li className="flex items-center gap-3">
                <FaYoutube className="text-red-600 text-xl" />
                <span className="font-medium text-gray-800">YouTube:</span>
                <a
                  href={contact.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:underline hover:text-red-700 transition-all"
                >
                  {contact.youtubeUrl}
                </a>
              </li>
            )}

            {contact.facebookUrl && (
              <li className="flex items-center gap-3">
                <FaFacebook className="text-blue-700 text-xl" />
                <span className="font-medium text-gray-800">Facebook:</span>
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline hover:text-blue-800 transition-all"
                >
                  {contact.facebookUrl}
                </a>
              </li>
            )}

            {contact.instaUrl && (
              <li className="flex items-center gap-3">
                <FaInstagram className="text-pink-500 text-xl" />
                <span className="font-medium text-gray-800">Instagram:</span>
                <a
                  href={contact.instaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-500 hover:underline hover:text-pink-600 transition-all"
                >
                  {contact.instaUrl}
                </a>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No contact details available.</p>
        )}

      </div>

      {/* ---- Edit Contact Modal ---- */}
      <Dialog open={editingContact} onOpenChange={() => setEditingContact(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>YouTube URL</Label>
              <Input
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Facebook URL</Label>
              <Input
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input
                value={formData.instaUrl}
                onChange={(e) => setFormData({ ...formData, instaUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveContact} disabled={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
