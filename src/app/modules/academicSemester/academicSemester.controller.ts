import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterAbleFileds } from './academicSemester.constant';
import { academicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await academicSemesterService.insertIntoDB(data);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully!!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterAbleFileds);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await academicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Retrieved Successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Retrieved Successfully!!',
    data: result,
  });
});

export const academicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
