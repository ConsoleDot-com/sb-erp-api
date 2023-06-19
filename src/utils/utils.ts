export const sendResponse = (
  res: any,
  message: any = null,
  data: any,
  status: number
) => {
  return res.status(status).json({ status, message, data });
};
