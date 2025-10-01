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

  useEffect(()=>{
    console.log(portfolio);
    console.log(portfolio.contactId);
  })
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Contact Details</h1>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Contact Links</h2>
          <Button variant="outline" onClick={() => setEditingContact(true)}>
            <FiEdit className="mr-2" /> Edit Contact
          </Button>
        </div>

        {contact ? (
          <ul className="space-y-2 text-gray-700">
            {contact.linkedinUrl && (
              <li>
                LinkedIn:{" "}
                <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-600">
                  {contact.linkedinUrl}
                </a>
              </li>
            )}
            {contact.githubUrl && (
              <li>
                GitHub:{" "}
                <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="text-gray-800">
                  {contact.githubUrl}
                </a>
              </li>
            )}
            {contact.twitterUrl && (
              <li>
                Twitter:{" "}
                <a href={contact.twitterUrl} target="_blank" rel="noreferrer" className="text-blue-400">
                  {contact.twitterUrl}
                </a>
              </li>
            )}
            {contact.youtubeUrl && (
              <li>
                YouTube:{" "}
                <a href={contact.youtubeUrl} target="_blank" rel="noreferrer" className="text-red-600">
                  {contact.youtubeUrl}
                </a>
              </li>
            )}
            {contact.facebookUrl && (
              <li>
                Facebook:{" "}
                <a href={contact.facebookUrl} target="_blank" rel="noreferrer" className="text-blue-700">
                  {contact.facebookUrl}
                </a>
              </li>
            )}
            {contact.instaUrl && (
              <li>
                Instagram:{" "}
                <a href={contact.instaUrl} target="_blank" rel="noreferrer" className="text-pink-500">
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
    </div>
  );
}
