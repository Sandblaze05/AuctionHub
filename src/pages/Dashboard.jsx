import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import AuctionForm from "../components/AuctionForm";
import AuctionItem from "../components/AuctionItem";
import { ChevronLeft } from "lucide-react";

const SOCKET_SERVER_URL = "https://auctionhub-ycv4.onrender.com";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/signup");
    }

    const newSocket = io(SOCKET_SERVER_URL, {
      auth: { token },
    });
    setSocket(newSocket);

    // Fetch initial items
    fetch(`${SOCKET_SERVER_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
    console.log(items);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("newItem", (newItem) => {
      setItems((prevItems) => [...prevItems, newItem]);
    });

    newSocket.on("updateItem", (updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    });

    newSocket.on("auctionEnded", (endedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === endedItem.id ? { ...item, status: 'ended' } : item
            )
        );
    });


    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  const handleNewItem = (itemData) => {
    if (socket) {
      socket.emit("createItem", itemData);
    }
  };

  const handleBid = (itemId, bidAmount, maxBid) => {
    if (socket) {
      const userId = JSON.parse(localStorage.getItem("user"));
      console.log(bidAmount);
      socket.emit("placeBid", { itemId, bidAmount, maxBid, userId });
    }
    else {
        console.warn('socket not connected');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-5">
          <span 
            onClick={() => navigate('/')}
            className="mb-6 cursor-pointer border-1 border-gray-300 hover:bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-500 transition-colors rounded-md p-2">
            <ChevronLeft />
          </span>
          <h2 className="text-3xl w-full font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
            Auction Dashboard
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Create a New Auction</h3>
          <AuctionForm onSubmit={handleNewItem} />
        </div>
        <div className="grid gap-6">
          {items.map((item) => (
            <AuctionItem key={item.id} item={item} onBid={handleBid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;