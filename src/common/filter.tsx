import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export default class HttpFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx=host.switchToHttp();
    const req=ctx.getRequest<Request>();
    const res=ctx.getResponse<Response>();
    const status=exception.getStatus();
    res.status(status).json({
      data:exception.message,
      time:new Date(),
      success:false,
      path:req.url,
      status,
      code:status
    })
  }
  
}