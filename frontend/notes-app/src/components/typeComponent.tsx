export type PasswordInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};
export type NoteCardProps = {
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPinned: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onPin: () => void;
};  
