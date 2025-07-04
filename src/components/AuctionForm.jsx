import { useState } from "react";

const AuctionForm = ({ onSubmit }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !startingBid || !auctionEndTime) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit({
      name: itemName,
      description,
      startingBid: parseFloat(startingBid),
      currentPrice: parseFloat(startingBid),
      endTime: new Date(auctionEndTime).toISOString(),
      id: JSON.parse(localStorage.getItem("user"))
    });
    setItemName("");
    setDescription("");
    setStartingBid("");
    setAuctionEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startingBid"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Starting Bid ($)
          </label>
          <input
            type="number"
            id="startingBid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="auctionEndTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Auction End Time
          </label>
          <input
            type="datetime-local"
            id="auctionEndTime"
            value={auctionEndTime}
            onChange={(e) => setAuctionEndTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Auction
        </button>
      </div>
    </form>
  );
};

export default AuctionForm;
