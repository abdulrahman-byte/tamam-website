"use client";
import { TextInput, Select, Group } from "@mantine/core";
import { FaBook, FaSearch } from "react-icons/fa";

export default function EducationHeader({ search, setSearch, category, setCategory, categories }) {
  return (
    <div className="mb-8 text-center">
      <div className="text-2xl font-bold mb-6 flex justify-center items-center gap-2">
        <FaBook /> الدورات التعليمية
      </div>
      <Group justify="center">
        <TextInput
          placeholder="ابحث عن كورس..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w={250}
          rightSection={<FaSearch />}
        />
        <Select
          data={categories}
          value={category}
          onChange={(val) => setCategory(val)}
          w={180}
        />
      </Group>
    </div>
  );
}
