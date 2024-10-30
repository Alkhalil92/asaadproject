import React from "react";
import { visitsData } from "../LoginData";

function VisitTable() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Return Button */}
      <a
        href="/home"
        className="mb-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ← رجوع
      </a>

      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          جميع الدورات
        </h1>

        <div className="overflow-hidden rounded-lg shadow" dir="rtl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الاسم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الرقم العسكري
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الهاتف
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الوقت
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  التاريخ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {visitsData.map((visit, index) => {
                const isToday = new Date(visit.date).toDateString() === new Date().toDateString();
                return (
                  <tr key={index} className={`transition-colors hover:bg-gray-50 ${isToday ? 'bg-green-100' : ''}`}>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.time}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                      {visit.rank}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisitTable;
