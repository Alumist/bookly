import { useState } from "react";
import { BookPage } from "./components/BookPage";
import { MyBookings } from "./components/MyBookings";

type Tab = "book" | "mine";

export default function App() {
  const [tab, setTab] = useState<Tab>("book");

  return (
    <main className="app">
      <h1>Bookly</h1>
      <nav className="tabs">
        <button
          type="button"
          aria-pressed={tab === "book"}
          onClick={() => setTab("book")}
        >
          Book
        </button>
        <button
          type="button"
          aria-pressed={tab === "mine"}
          onClick={() => setTab("mine")}
        >
          My bookings
        </button>
      </nav>
      {tab === "book" ? <BookPage /> : <MyBookings />}
    </main>
  );
}