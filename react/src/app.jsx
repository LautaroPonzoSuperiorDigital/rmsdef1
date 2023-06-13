import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Tenant from "./components/Tenants";
import ListingsAdmin from "./components/ListingsAdmin";
import Applicants from "./components/Applicants";
import Chats from "./components/Chats";
import Documents from "./components/Documents";
import SubAdmins from "./components/SubAdmins";
import PublicListings from "./components/Public/PublicListings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="listingsAdmin" element={<ListingsAdmin />} />
        <Route path="tenantsAdmin" element={<Tenant />} />
        <Route path="applicantsAdmin" element={<Applicants />} />
        <Route path="chatsAdmin" element={<Chats />} />
        <Route path="documentsAdmin" element={<Documents />} />
        <Route path="subAdminsAdmin" element={<SubAdmins />} />
        <Route path="publicListings" element={<PublicListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
