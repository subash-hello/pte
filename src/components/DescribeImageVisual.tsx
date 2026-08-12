"use client";

import React from "react";

interface DescribeImageVisualProps {
  question: any;
}

export default function DescribeImageVisual({ question }: DescribeImageVisualProps) {
  const type = question.type || "bar_chart";
  const title = question.title || "Describe Image Specimen";
  const keyPoints = question.keyPointsToCover || [];

  // Parse points or default data
  const isPie = type === "pie_chart" || title.toLowerCase().includes("pie");
  const isLine = type === "line_graph" || title.toLowerCase().includes("line");
  const isProcess = type === "process_diagram" || title.toLowerCase().includes("process");
  const isMap = type === "map" || title.toLowerCase().includes("map");
  const isTable = type === "table" || title.toLowerCase().includes("table");

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-5">
      {/* Title */}
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse" />
          <h3 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
        <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Official PTE Chart Specimen
        </span>
      </div>

      {/* 1. BAR CHART VISUAL */}
      {!isPie && !isLine && !isProcess && !isMap && !isTable && (
        <div className="w-full max-w-lg flex flex-col gap-4 py-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
              {title} (Percentage Share %)
            </span>

            <div className="flex items-end justify-around h-48 border-b-2 border-l-2 border-slate-300 pt-6 px-4 gap-4">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-bold font-mono text-indigo-600">45%</span>
                <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md h-36 transition-all shadow-xs" />
                <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center">Solar</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-bold font-mono text-blue-600">30%</span>
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md h-24 transition-all shadow-xs" />
                <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center">Wind</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-bold font-mono text-emerald-600">20%</span>
                <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md h-16 transition-all shadow-xs" />
                <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center">Hydro</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-bold font-mono text-amber-600">5%</span>
                <div className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-md h-6 transition-all shadow-xs" />
                <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center">Geothermal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LINE GRAPH VISUAL */}
      {isLine && (
        <div className="w-full max-w-lg flex flex-col gap-4 py-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
              {title} (Growth Trajectory)
            </span>

            <div className="relative h-48 w-full border-b-2 border-l-2 border-slate-300 p-4 flex items-end justify-between">
              {/* SVG Line path */}
              <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10,80 Q 35,50 60,30 T 90,10" fill="none" stroke="#4f46e5" strokeWidth="4.5" />
                <circle cx="10" cy="80" r="4" fill="#4f46e5" />
                <circle cx="35" cy="55" r="4" fill="#4f46e5" />
                <circle cx="60" cy="30" r="4" fill="#4f46e5" />
                <circle cx="90" cy="10" r="4" fill="#4f46e5" />
              </svg>

              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-700 font-mono">2.0B</span>
                <span className="text-[10px] text-slate-500 mt-36 font-semibold">2010</span>
              </div>
              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-700 font-mono">3.2B</span>
                <span className="text-[10px] text-slate-500 mt-36 font-semibold">2015</span>
              </div>
              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-700 font-mono">4.5B</span>
                <span className="text-[10px] text-slate-500 mt-36 font-semibold">2020</span>
              </div>
              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-700 font-mono">5.4B</span>
                <span className="text-[10px] text-slate-500 mt-36 font-semibold">2025</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PIE CHART VISUAL */}
      {isPie && (
        <div className="w-full max-w-lg flex flex-col gap-4 py-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-center justify-around gap-6">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
              <path strokeDasharray="35, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4f46e5" strokeWidth="6" />
              <path strokeDasharray="25, 100" strokeDashoffset="-35" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="6" />
              <path strokeDasharray="15, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="6" />
              <path strokeDasharray="25, 100" strokeDashoffset="-75" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="6" />
            </svg>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                <span className="font-bold text-slate-800">Housing: 35%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-500" />
                <span className="font-bold text-slate-800">Food & Dining: 25%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="font-bold text-slate-800">Transportation: 15%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="font-bold text-slate-800">Entertainment: 25%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PROCESS DIAGRAM VISUAL */}
      {isProcess && (
        <div className="w-full max-w-lg flex flex-col gap-3 py-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-indigo-200 text-center flex-1 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-1">1</span>
              <span className="text-xs font-bold text-slate-900">Evaporation</span>
              <span className="text-[10px] text-slate-500">Solar heat turns water into vapor</span>
            </div>

            <span className="text-indigo-600 font-extrabold text-lg">→</span>

            <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-blue-200 text-center flex-1 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-1">2</span>
              <span className="text-xs font-bold text-slate-900">Condensation</span>
              <span className="text-[10px] text-slate-500">Vapor cools into clouds</span>
            </div>

            <span className="text-indigo-600 font-extrabold text-lg">→</span>

            <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-emerald-200 text-center flex-1 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1">3</span>
              <span className="text-xs font-bold text-slate-900">Precipitation</span>
              <span className="text-[10px] text-slate-500">Rainfall returns water to reservoirs</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. MAP COMPARISON VISUAL */}
      {isMap && (
        <div className="w-full max-w-lg flex flex-col gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col items-center text-center">
              <span className="text-xs font-bold text-emerald-900 mb-2">1995 City Map Layout</span>
              <div className="w-full h-24 bg-emerald-200/60 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-800">
                🌲 Agricultural Farmland & Green Belt
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col items-center text-center">
              <span className="text-xs font-bold text-indigo-900 mb-2">2025 City Map Layout</span>
              <div className="w-full h-24 bg-indigo-200/60 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-800">
                🏙️ Commercial High-rises & Highways
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. DATA TABLE VISUAL */}
      {isTable && (
        <div className="w-full max-w-lg py-2">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-indigo-600 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3">Economic Sector</th>
                <th className="p-3">CO2 Emission Share</th>
                <th className="p-3">Primary Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-slate-50">
              <tr>
                <td className="p-3 font-bold text-slate-900">Electricity Generation</td>
                <td className="p-3 font-mono font-bold text-indigo-600">40%</td>
                <td className="p-3 text-slate-600">Coal & Fossil Power</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Transportation</td>
                <td className="p-3 font-mono font-bold text-blue-600">24%</td>
                <td className="p-3 text-slate-600">Vehicles & Shipping</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Manufacturing</td>
                <td className="p-3 font-mono font-bold text-emerald-600">20%</td>
                <td className="p-3 text-slate-600">Heavy Industry</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Agriculture</td>
                <td className="p-3 font-mono font-bold text-amber-600">16%</td>
                <td className="p-3 text-slate-600">Farming & Livestock</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Key Points Checklist */}
      {keyPoints.length > 0 && (
        <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Target Speaking Data Points:
          </span>
          <div className="flex flex-wrap gap-2">
            {keyPoints.map((pt: string, idx: number) => (
              <span
                key={idx}
                className="text-xs font-bold text-indigo-700 bg-white border border-indigo-100 px-3 py-1 rounded-lg shadow-xs"
              >
                • {pt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
