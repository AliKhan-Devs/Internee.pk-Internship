// src/components/dashboard/Profile.jsx
import { useState } from "react";
import { usePortfolio } from "../../context/portfolioContext";
import api from "../../utils/api";
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
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ImageUploader from "@/components/ImageUploader";
import IconPicker from "@/components/IconPicker";
import RenderIcon from "@/components/RenderIcon";

export default function Profile() {
  const { portfolio, addButton, updateButton, deleteButton, updatePortfolio, fetchPortfolio } =
    usePortfolio();
  const profiles = portfolio?.profileIds || [];
  const [loading, setLoading] = useState(false);

  // Modal states
  const [editingProfile, setEditingProfile] = useState(null);
  const [editingButton, setEditingButton] = useState(null);
  const [addingButtonProfile, setAddingButtonProfile] = useState(null);

  const [formData, setFormData] = useState({
    heading: "",
    tagline: "",
    description: "",
    profileImg: "",
  });

  const [buttonData, setButtonData] = useState({
    text: "",
    link: "",
    buttonIcon: "",
  });

  // ---- Profile Handlers ----
  const handleOpenProfileModal = (profile) => {
    setFormData({
      heading: profile.heading,
      tagline: profile.tagline,
      description: profile.description,
      profileImg: profile.profileImg,
    });
    setEditingProfile(profile);
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;
    setLoading(true);
    try {
      const res = await api.put(
        `/section/profile/${editingProfile._id}`,
        formData,
        { withCredentials: true }
      );
      // updatePortfolio({
      //   profileIds: profiles.map((p) =>
      //     p._id === editingProfile._id ? res.data : p
      //   ),
      // });
      fetchPortfolio();
      setEditingProfile(null);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Button Handlers ----
  const handleOpenAddButton = (profile) => {
    setButtonData({ text: "", link: "",buttonIcon:"" });
    setAddingButtonProfile(profile);
  };

  const handleSaveNewButton = async () => {
    if (!addingButtonProfile) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/button/create-button",
        {
          ...buttonData,
          buttonPosition: addingButtonProfile._id,
          onModal: "Profile",
        },
        { withCredentials: true }
      );
      // addButton(addingButtonProfile._id, res.data);
      fetchPortfolio();
      setAddingButtonProfile(null);
    } catch (err) {
      console.error("Failed to add button", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditButton = (profileId, btn) => {
    setButtonData({ text: btn.text, link: btn.link, buttonIcon: btn.buttonIcon });
    setEditingButton({ ...btn, profileId });
  };

  const handleUpdateButton = async () => {
    if (!editingButton) return;
    setLoading(true);
    try {
      const res = await api.put(
        `/button/update/${editingButton._id}`,
        buttonData,
        { withCredentials: true }
      );
      // updateButton(editingButton.profileId, editingButton._id, res.data);
      fetchPortfolio();
      setEditingButton(null);
    } catch (err) {
      console.error("Failed to edit button", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteButton = async (profileId, btnId) => {
    if (!confirm("Are you sure you want to delete this button?")) return;
    setLoading(true);
    try {
      await api.delete(`/button/delete/${btnId}`, { withCredentials: true });
      // deleteButton(profileId, btnId);
      fetchPortfolio();
    } catch (err) {
      console.error("Failed to delete button", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-16 md:mb-0 space-y-10">
      <h1 className="text-3xl font-bold">Manage Your Profile</h1>

      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="bg-white shadow rounded-lg p-6 relative border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {profile?.type.charAt(0).toUpperCase() + profile?.type.slice(1)}{" "}
              Section
            </h2>
            <Button
              variant="outline"
              onClick={() => handleOpenProfileModal(profile)}
            >
              <FiEdit className="mr-2" /> Edit Section
            </Button>
          </div>
          <img src={profile.profileImg} alt="" className="w-24 h-24" />
          <p className="text-gray-600 mb-2">{profile.heading}</p>
          <p className="text-gray-600 mb-2 italic">{profile.tagline}</p>
          <p className="text-gray-600">{profile.description}</p>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            {profile.buttons.length > 0 ? (
              profile.buttons.map((btn) => (
                <div
                  key={btn._id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                >
                  <a
                    href={btn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                  >
                    <RenderIcon iconName={btn.buttonIcon} size={20} color={'#fff'} className={'inline'}/> {btn.text}
                  </a>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditButton(profile._id, btn)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteButton(profile._id, btn._id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No buttons added yet.</p>
            )}
          </div>

          <Button
            className="mt-4"
            onClick={() => handleOpenAddButton(profile)}
            disabled={loading}
          >
            <FiPlus className="mr-2" /> Add Button
          </Button>
        </div>
      ))}


      {/* ---- Profile Edit Modal ---- */}
      <Dialog
        open={!!editingProfile}
        onOpenChange={() => setEditingProfile(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Heading</Label>
              <Input
                value={formData.heading}
                onChange={(e) =>
                  setFormData({ ...formData, heading: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tagline</Label>
              <Input
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Profile Image</Label>
              {/* <Input
                value={formData.profileImg}
                onChange={(e) =>
                  setFormData({ ...formData, profileImg: e.target.value })
                }
              /> */}
              <ImageUploader
                onUpload={(url) => setFormData((prev) => ({ ...prev, profileImg: url }))}
                previosImgUrl={formData.profileImg}
              />

            </div>
           
          </div>
          <DialogFooter>
            <Button onClick={handleSaveProfile} disabled={loading}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Add Button Modal ---- */}
      <Dialog
        open={!!addingButtonProfile}
        onOpenChange={() => setAddingButtonProfile(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Button</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Button Text</Label>
              <Input
                value={buttonData.text}
                onChange={(e) =>
                  setButtonData({ ...buttonData, text: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Button Link</Label>
              <Input
                value={buttonData.link}
                onChange={(e) =>
                  setButtonData({ ...buttonData, link: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <IconPicker
                label="Icon"
                value={buttonData.buttonIcon}
                onChange={(iconName) => setButtonData({ ...buttonData, buttonIcon: iconName })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveNewButton} disabled={loading}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Edit Button Modal ---- */}
      <Dialog
        open={!!editingButton}
        onOpenChange={() => setEditingButton(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Button</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Button Text</Label>
              <Input
                value={buttonData.text}
                onChange={(e) =>
                  setButtonData({ ...buttonData, text: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Button Link</Label>
              <Input
                value={buttonData.link}
                onChange={(e) =>
                  setButtonData({ ...buttonData, link: e.target.value })
                }
              />
            </div>
            <div>
              <IconPicker
                label="Icon"
                value={buttonData.buttonIcon}
                onChange={(iconName) => setButtonData({ ...buttonData, buttonIcon: iconName })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateButton} disabled={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}


