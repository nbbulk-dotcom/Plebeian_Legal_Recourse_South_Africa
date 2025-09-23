import React from "react";

interface FeedItem {
  id: number;
  title: string;
  excerpt: string;
  time: string;
  tags: string[];
}

interface LiveFeedProps {
  items: FeedItem[];
}

export default function LiveFeed({ items }: LiveFeedProps) {
  return (
    <aside className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{item.time}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.excerpt}</p>
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-neutralBg rounded text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center">
        <button className="text-sm text-accent hover:text-accent/80 font-medium">
          View All Activity →
        </button>
      </div>
    </aside>
  );
}
