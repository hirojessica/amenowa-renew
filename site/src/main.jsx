import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./amenowa.css";
import "./responsive.css";
import "./fidelity.css";
import "./content-structure.css";
import "./case-chronology.css";
import "./aquainsights-support.css";
import "./meguru-details.css";

const root=document.getElementById('root');
const app=<React.StrictMode><App/></React.StrictMode>;
if(root.hasChildNodes()) hydrateRoot(root,app); else createRoot(root).render(app);
