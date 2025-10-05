// src/components/dashboard/Overview.jsx
import { useState, useEffect } from "react";
import { usePortfolio } from "@/context/portfolioContext";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiRotateCcw } from "react-icons/fi";
import ImageUploader from "@/components/ImageUploader";
import IconPicker from "@/components/IconPicker";
import RenderIcon from "@/components/RenderIcon";

export default function Overview() {
  const {
    portfolio,
    fetchPortfolio
  } = usePortfolio();

  const overviews = portfolio?.overviewIds || [];
  const [loading, setLoading] = useState(false);

  // ---- Modal states ----
  const [editingOverview, setEditingOverview] = useState(null);
  const [addingButtonOverview, setAddingButtonOverview] = useState(null);
  const [editingButton, setEditingButton] = useState(null);
  const [addingCardOverview, setAddingCardOverview] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  const [formData, setFormData] = useState({ title: "", description: "", isActive: true });
  const [buttonData, setButtonData] = useState({ text: "", link: "",buttonIcon:"" });
  const [cardData, setCardData] = useState({ title: "", description: "", icon: "", imgUrl: "", tags: "" });

  // ---- Section Handlers ----
  const handleSaveOverview = async () => {
    if (!editingOverview) return;
    setLoading(true);
    try {
      const res = await api.put(
        `/section/overview/${editingOverview._id}`,
        formData,
        { withCredentials: true }
      );
      fetchPortfolio();
      setEditingOverview(null);
    } catch (err) {
      console.error("Failed to update overview", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Button Handlers ----
  const handleDeleteButton = async (id) => {
    if (!confirm("Are you sure you want to delete this button?")) return;
    setLoading(true);
    try {
      await api.delete(`/button/delete/${id}`, { withCredentials: true });
      fetchPortfolio();
      alert('delete success fully');
    } catch (err) {
      console.error("Failed to delete button", err);
    } finally {
      setLoading(false);
    }
  }
  const handleSaveNewButton = async () => {
    if (!addingButtonOverview) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/button/create-button",
        { ...buttonData, buttonPosition: addingButtonOverview._id, onModal: "Overview" },
        { withCredentials: true }
      );
      fetchPortfolio();
     
      setAddingButtonOverview(null);
    } catch (err) {
      console.error("Failed to add button", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateButtonModal = async () => {
    if (!editingButton) return;
    setLoading(true);
    try {
      const res = await api.put(
        `/button/update/${editingButton._id}`,
        buttonData,
        { withCredentials: true }
      );
      fetchPortfolio();
      setEditingButton(null);
    } catch (err) {
      console.error("Failed to update button", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Card Handlers ----
  const handleSaveNewCard = async () => {
    if (!addingCardOverview) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/card/create",
        { ...cardData, cardPosition: addingCardOverview._id },
        { withCredentials: true }
      );
      fetchPortfolio();
      setAddingCardOverview(null);
    } catch (err) {
      console.error("Failed to add card", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCard = async (id) => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    setLoading(true);
    try {
      await api.delete(`/card/delete/${id}`, { withCredentials: true });
      fetchPortfolio();
      alert('delete success fully');
    } catch (err) {
      console.error("Failed to delete card", err);
    } finally {
      setLoading(false);
    }
  }
  const handleUpdateCardModal = async () => {
    if (!editingCard) return;
    setLoading(true);
    try {
      const res = await api.put(
        `/card/update/${editingCard._id}`,
        cardData,
        { withCredentials: true }
      );
      fetchPortfolio();
      setEditingCard(null);
    } catch (err) {
      console.error("Failed to update card", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Manage Overview Sections</h1>
      {/* Refresh button */}
      <Button onClick={() => fetchPortfolio()}>Refresh <FiRotateCcw className="inline" /></Button>

      {overviews.map((ov) => (
        <Card key={ov._id} className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{ov.title}</h2>
            <Button onClick={() => { setFormData({ title: ov.title, description: ov.description, isActive: ov.isActive }); setEditingOverview(ov); }}>
              Edit Section
            </Button>
          </div>
          <p className="text-gray-600">{ov.description}</p>

          {/* Section Buttons */}
          <div>
            <h3 className="font-medium mb-2">Section Buttons</h3>
            {ov.buttons?.length > 0 ? ov.buttons.map((btn) => (
              <div key={btn._id} className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2">
                <a href={btn.link} target="_blank" rel="noreferrer" className="text-blue-600"><RenderIcon iconName={btn.buttonIcon} size={20} color={'white'} className={"inline"}/> {btn.text}</a>
                <div className="space-x-2">
                  <Button size="sm" onClick={() => { setButtonData({ text: btn.text, link: btn.link, buttonIcon: btn.buttonIcon }); setEditingButton({ ...btn, overviewId: ov._id, type: "overview" }); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteButton(btn._id)}>Delete</Button>
                </div>
              </div>
            )) : <p className="text-sm text-gray-400">No buttons yet</p>}
            <Button size="sm" className="mt-2" onClick={() => { setButtonData({ text: "", link: "", buttonIcon: "" }); setAddingButtonOverview(ov); }}>+ Add Button</Button>
          </div>

          {/* Cards */}
          <div>
            <h3 className="font-medium mb-2">Cards</h3>
            {ov.cards?.length > 0 ? ov.cards.map((card) => (
              <Card key={card._id} className="p-4 mb-2">
                <h4 className="font-semibold">{card.title}</h4>
                <p className="text-gray-600">{card.description}</p>
                <div className="mt-2 space-x-2">
                  <Button size="sm" onClick={() => { setCardData({ title: card.title, description: card.description, imgUrl: card.imgUrl, tags: card.tags, icon: card.icon }); setEditingCard({ ...card, overviewId: ov._id }); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCard(card._id)}>Delete</Button>
                </div>

                {/* Buttons inside Card */}
                <div className="mt-2">
                  {card.buttons?.map((btn) => (
                    <div key={btn._id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                     <Button> <a href={btn.link} target="_blank" rel="noreferrer" className="text-white"><RenderIcon iconName={btn.buttonIcon} size={20} color={'white'} className={"inline"}/> {btn.text}</a></Button>
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => { setButtonData({ text: btn.text, link: btn.link, buttonIcon: btn.buttonIcon }); setEditingButton({ ...btn, overviewId: card._id, type: "card" }); }}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteButton(btn._id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" className="mt-2" onClick={() => { setButtonData({ text: "", link: "", buttonIcon: "" }); setAddingButtonOverview(card); }}>+ Add Card Button</Button>
                </div>
              </Card>
            )) : <p className="text-sm text-gray-400">No cards yet</p>}
            <Button size="sm" className="mt-2" onClick={() => { setCardData({ title: "", description: "", imgUrl: "", icon: "" }); setAddingCardOverview(ov); }}>+ Add Card</Button>
          </div>
        </Card>
      ))}

      {/* ---- Edit Overview Modal ---- */}
      <Dialog open={!!editingOverview} onOpenChange={() => setEditingOverview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Overview Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Label>IsActive</Label>
              <Input className={"h-5 w-5"} type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
            </div>
          </div>
          <DialogFooter>
            <Button className={loading ? "cursor-not-allowed" : "cursor-pointer"} onClick={handleSaveOverview} disabled={loading}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Add/Edit Button Modal ---- */}
      <Dialog open={!!addingButtonOverview || !!editingButton} onOpenChange={() => { setAddingButtonOverview(null); setEditingButton(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingButton ? "Edit Button" : "Add Button"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Button Text</Label>
              <Input value={buttonData.text} onChange={(e) => setButtonData({ ...buttonData, text: e.target.value })} />
            </div>
            <div>
              <Label>Button Link</Label>
              <Input value={buttonData.link} onChange={(e) => setButtonData({ ...buttonData, link: e.target.value })} />
            </div>

            <div>
              <IconPicker label="Button Icon" value={buttonData.buttonIcon} onChange={(e) => setButtonData({ ...buttonData, buttonIcon: e })} />
            </div>

          </div>
          <DialogFooter>
            <Button onClick={editingButton ? handleUpdateButtonModal : handleSaveNewButton} disabled={loading}>
              {editingButton ? "Save Changes" : "Add Button"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Add/Edit Card Modal ---- */}
      <Dialog open={!!addingCardOverview || !!editingCard} onOpenChange={() => { setAddingCardOverview(null); setEditingCard(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCard ? "Edit Card" : "Add Card"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={cardData.title} onChange={(e) => setCardData({ ...cardData, title: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={cardData.description} onChange={(e) => setCardData({ ...cardData, description: e.target.value })} />
            </div>
            <div>
              <Label>Image </Label>
              <ImageUploader
                onUpload={(url) =>setCardData({ ...cardData, imgUrl: url })}
              />  
            </div>
            <div>
              {/* <Label>Icon</Label> */}
              <IconPicker value={cardData.icon} onChange={(e) => setCardData({ ...cardData, icon: e })} />
              {/* <Input value={cardData.icon} onChange={(e) => setCardData({ ...cardData, icon: e.target.value })} /> */}
            </div>


          </div>
          <DialogFooter>
            <Button onClick={editingCard ? handleUpdateCardModal : handleSaveNewCard} disabled={loading}>
              {editingCard ? "Save Changes" : "Add Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
