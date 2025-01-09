import { router } from '@inertiajs/react';
import { useState } from 'react';

//query = ค่าของการค้นหาที่ส่งกลับมาจาก controller
//employees = ข้อมูลพนักงานที่ส่งกลับมาจาก controller
export default function Index({ employees, query }) {
    // State สำหรับเก็บค่าที่พิมพ์ในช่องค้นหา
    const [search, setSearch] = useState(query || '');

    // State สำหรับเก็บข้อมูลการเรียงลำดับ (column และลำดับ ASC/DESC)
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // กำหนดจำนวนหน้าที่ต้องการแสดงต่อกลุ่ม (กลุ่มละ 15 หน้า)
    const ITEMS_PER_PAGE_GROUP = 15;
    const [currentGroup, setCurrentGroup] = useState(1); // เก็บกลุ่มหน้าปัจจุบัน

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = [...employees.data].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // คำนวณกลุ่มหน้าปัจจุบัน
    const totalPages = employees.last_page;
    const totalGroups = Math.ceil(totalPages / ITEMS_PER_PAGE_GROUP); // จำนวนกลุ่มทั้งหมด
    const startPage = (currentGroup - 1) * ITEMS_PER_PAGE_GROUP + 1;
    const endPage = Math.min(startPage + ITEMS_PER_PAGE_GROUP - 1, totalPages);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Employee List</h1>

                <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Search employees..."
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                        Search
                    </button>
                </form>

                <table className="w-full table-auto border-collapse border border-gray-200 shadow-md mb-6">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="cursor-pointer border border-gray-300 px-4 py-2"
                                onClick={() => handleSort('emp_no')}
                            >
                                ID {sortConfig.key === 'emp_no' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="cursor-pointer border border-gray-300 px-4 py-2"
                                onClick={() => handleSort('first_name')}
                            >
                                First Name {sortConfig.key === 'first_name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="cursor-pointer border border-gray-300 px-4 py-2"
                                onClick={() => handleSort('last_name')}
                            >
                                Last Name {sortConfig.key === 'last_name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="cursor-pointer border border-gray-300 px-4 py-2"
                                onClick={() => handleSort('gender')}
                            >
                                Gender {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map((employee, index) => (
                            <tr key={index} className="text-center even:bg-gray-50 odd:bg-white">
                                <td className="border border-gray-300 px-4 py-2">{employee.emp_no}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.first_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.last_name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {employee.gender === 'M' ? 'Male' : 'Female'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => {
                            if (currentGroup > 1) setCurrentGroup(currentGroup - 1);
                        }}
                        disabled={currentGroup === 1}
                        className={`${
                            currentGroup === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-700'
                        } text-white font-bold px-4 py-2 rounded-lg`}
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                            <button
                                key={page}
                                onClick={() => router.get('/employee', { page, search })}
                                className={`px-4 py-2 rounded-lg ${
                                    employees.current_page === page
                                        ? 'bg-pink-500 text-white font-bold'
                                        : 'bg-gray-300 text-gray-800 hover:bg-pink-400 hover:text-white'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (currentGroup < totalGroups) setCurrentGroup(currentGroup + 1);
                        }}
                        disabled={currentGroup === totalGroups}
                        className={`${
                            currentGroup === totalGroups ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-700'
                        } text-white font-bold px-4 py-2 rounded-lg`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
