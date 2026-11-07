
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const publishingData = [
  { month: "May", posts: 8 },
  { month: "Jun", posts: 12 },
  { month: "Jul", posts: 9 },
  { month: "Aug", posts: 15 },
  { month: "Sep", posts: 11 },
  { month: "Oct", posts: 14 },
];

export function BlogPublishingActivity() {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-dark dark:text-white">
          Blog Publishing Activity
        </h2>
        <p className="mt-1 text-sm text-dark-6">
          Number of posts published each month
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={publishingData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              opacity={0.12}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "currentColor", opacity: 0.05 }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
              formatter={(value) => [value, "Published posts"]}
            />

            <Bar
              dataKey="posts"
              name="Published posts"
              fill="#5750F1"
              radius={[5, 5, 0, 0]}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
