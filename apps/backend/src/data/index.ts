type Log = {
  createdAt: Date;
  channel: "email";
  recipient: string;
  status: "accepted" | "failed";
};

export const logs: Log[] = [];
