import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

const BASE_URL = "https://notehub-public.goit.study/api";
axios.defaults.baseURL = BASE_URL;

export async function fetchNotes(
  params?: FetchNotesParams
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: params,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function createNote(
  createNoteData: CreateNoteData
): Promise<Note> {
  const res = await axios.post<Note>("/notes", createNoteData, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function deleteNote(id: string): Promise<void> {
  await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
}
