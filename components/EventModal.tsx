"use client";

import { format } from "date-fns";
import type { CalendarEvent } from "@/app/types";

type Props = {
  isOpen: boolean;
  selectedDate: Date | null;
  title: string;
  setTitle: (v: string) => void;
  editingEvent: CalendarEvent | null;
  onClose: () => void;
  onSave: () => void;
};

export default function EventModal({
  isOpen,
  selectedDate,
  title,
  setTitle,
  editingEvent,
  onClose,
  onSave,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="text-sm text-gray-500">
            {editingEvent ? "予定を編集" : "予定を追加"}
          </h2>

          <button onClick={onClose}>×</button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <input
            className="w-full border-b px-1 py-3 text-2xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>{selectedDate ? format(selectedDate, "yyyy年M月d日") : ""}</div>
        </div>

        <div className="flex justify-end gap-2 px-5 py-3">
          <button onClick={onClose}>キャンセル</button>
          <button onClick={onSave}>{editingEvent ? "更新" : "保存"}</button>
        </div>
      </div>
    </div>
  );
}
