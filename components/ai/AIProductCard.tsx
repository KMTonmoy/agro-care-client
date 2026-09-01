"use client";

import Link from "next/link";
import { ShoppingBag, CheckCircle } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    category: string;
    description: string;
    url: string;
  };
}

const AIProductCard = ({ product }: ProductCardProps) => {
  const inStock = product.stock > 0;

  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 hover:border-[#1D976C]/30 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[#F1F5F2] truncate">
            {product.name}
          </h4>
          <p className="text-xs text-[#7D8983] truncate">{product.category}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm font-bold text-[#93F9B9]">
              ৳{product.price}
            </span>
            <span className={`text-xs ${inStock ? "text-green-400" : "text-red-400"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <Link
          href={product.url}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] text-xs font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300 whitespace-nowrap"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          View
        </Link>
      </div>
    </div>
  );
};

export default AIProductCard;