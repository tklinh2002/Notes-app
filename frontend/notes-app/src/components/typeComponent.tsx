export type PasswordInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};
export type NoteCardProps = {
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  isPinned: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onPin: () => void;
};

export type Note = {
  _id: string; 
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  isPinned: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};
