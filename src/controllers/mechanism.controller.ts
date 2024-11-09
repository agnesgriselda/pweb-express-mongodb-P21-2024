import { Request, Response } from 'express';
import mechanismService from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id; 
    const { currentQty } = await mechanismService.borrowBook(bookId); 

    res.status(200).json({
      status: 'success',
      message: 'Successfully borrowed book',
      data: {
        currentQty,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id; 
    const { currentQty } = await mechanismService.returnBook(bookId); 

    res.status(200).json({
      status: 'success',
      message: 'Successfully returned book',
      data: {
        currentQty,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};