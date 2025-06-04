'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// ApexCharts'ni SSRsiz import qilamiz
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const stats = [
  { title: 'Total Views', value: '3.5K', change: '+0.45%', color: 'text-green-500' },
  { title: 'Total Profit', value: '$4.2K', change: '+4.35%', color: 'text-green-500' },
  { title: 'Total Products', value: '1.2K', change: '+2.59%', color: 'text-green-500' },
  { title: 'Total Users', value: '980', change: '-0.95%', color: 'text-red-500' }
]

// Chart options
const areaChartOptions = {
  chart: {
    id: 'revenue-expense'
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
}
const areaChartSeries = [
  {
    name: 'Revenue',
    data: [300, 400, 350, 500, 490, 600, 700]
  },
  {
    name: 'Expenses',
    data: [200, 300, 250, 400, 390, 450, 500]
  }
]

const barChartOptions = {
  chart: {
    id: 'weekly-profit'
  },
  xaxis: {
    categories: ['Ustozlar', 'Menagerlar', 'Adminlar', 'Kurslar']
  }
}
const barChartSeries = [
  {
    name: 'Profit',
    data: [80, 100, 60, 120]
  }
]

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 ">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white shadow rounded-xl p-4">
            <div className="text-gray-500">{stat.title}</div>
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className={`text-sm ${stat.color}`}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue vs Expenses */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Revenue vs Expenses</h2>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <Chart
            options={areaChartOptions}
            series={areaChartSeries}
            type="area"
            height={300}
          />
        </div>

        {/* Profit This Week */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Profit This Week</h2>
            <select className="text-sm border rounded px-2 py-1">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>

      {/* New Users Line Chart */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-semibold text-lg mb-2">New Users</h2>
        <Chart
          options={{
            chart: { id: 'new-users' },
            xaxis: {
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
          }}
          series={[
            {
              name: 'Users',
              data: [10, 30, 25, 50, 40, 60, 70]
            }
          ]}
          type="line"
          height={300}
        />
      </div>
    </div>
  )
}
