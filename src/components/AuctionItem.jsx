import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO, isAfter } from "date-fns";

const AuctionItem = ({ item, onBid }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [maxBid, setMaxBid] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = parseISO(item.endTime);

      if (isAfter(now, endTime) || item.status === "ended") {
        setTimeLeft("Auction Ended");
      } else {
        setTimeLeft(formatDistanceToNow(endTime, { addSuffix: true }));
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [item.endTime, item.status]);

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const numericBid = parseFloat(bidAmount);
    if (!numericBid || numericBid <= item.currentPrice) {
      alert("Your bid must be higher than the current price.");
      return;
    }

    onBid(
      item.id,
      numericBid,
      maxBid ? parseFloat(maxBid) : undefined
    );

    setBidAmount("");
    setMaxBid("");
  };

  const isEnded =
    new Date() > parseISO(item.endTime) || item.status === "ended";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
      <div className="p-6">
        {/* Title & Timer */}
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {item.name}
          </h3>
          <div
            className={`text-lg font-semibold ${
              isEnded ? "text-red-500" : "text-green-500"
            }`}
          >
            {timeLeft}
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {item.description}
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Bid
            </p>
            <p className="text-xl font-bold">
              ₹{item.currentPrice?.toFixed(2) ?? "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Highest Bidder
            </p>
            <p className="text-xl font-bold">
              {item.highestBidder?.username || "None"}
            </p>
          </div>
        </div>

        {/* Bidding Form */}
        {!isEnded && (
          <form onSubmit={handleBidSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Your Bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                min={item.currentPrice + 0.01}
                step="0.01"
              />
              <input
                type="number"
                placeholder="Max Automated Bid (Optional)"
                value={maxBid}
                onChange={(e) => setMaxBid(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min={
                  bidAmount
                    ? parseFloat(bidAmount) + 0.01
                    : item.currentPrice + 0.01
                }
                step="0.01"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
              disabled={isEnded}
            >
              Place Bid
            </button>
          </form>
        )}

        {/* Auction Ended */}
        {isEnded && (
          <div className="mt-6 text-center text-xl font-bold text-red-600 dark:text-red-400 border-t pt-4 border-gray-200 dark:border-gray-700">
            Auction has ended. Winner:{" "}
            {item.highestBidder?.username || "None"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionItem;
