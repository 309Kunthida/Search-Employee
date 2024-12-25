<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CSmjuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ;
    }

    /**
     * create ทำหน้าที่โชว์ฟอร์ม
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * หน้าที่store เอาข้อมูลจาก from เก็บลง storage เก็บลงฐานข้อมูล
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * แสดงรายละเอียดสินค้าที่เราเลือก ถึงมีพารามิเตอร์แค่ตัวเดียวUser $user
     */
    public function show(User $user)
    {
        //
    }

    /**
     * edit จาก form
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * edit จาก storage
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * จัดการลบในฐานข้อมูล ปกติการลบมันไม่มีฟอร์มอยู๋แล้ว
     */
    public function destroy(string $id)
    {
        //
    }
}
