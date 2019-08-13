import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ProductService } from "./product.service";
import { Product } from "../types/product";
import { SellerGuard } from "../guards/seller.guard";
import { User as UserDocument } from "../types/user";
import { User } from "../utils/user.decorator";
import { CreateProductDTO, UpdateProductDTO } from "./product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get("/mine")
  @UseGuards(AuthGuard("jwt"), SellerGuard)
  async listMine(@User() { id }: UserDocument) {
    return await this.productService.findByOwner(id);
  }

  @Get("/seller/:id")
  async listBySeller(@Param("id") id: string): Promise<Product[]> {
    return await this.productService.findByOwner(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"), SellerGuard)
  async create(@Body() product: CreateProductDTO, @User() user: UserDocument) {
    return await this.productService.create(product, user);
  }

  @Get(":id")
  async read(@Param("id") id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"), SellerGuard)
  async update(
    @Param("id") id: string,
    @Body() product: UpdateProductDTO,
    @User() { id: userId }: UserDocument,
  ): Promise<Product> {
    return await this.productService.update(id, product, userId);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), SellerGuard)
  async delete(
    @Param("id") id: string,
    @User() { id: userId }: UserDocument,
  ): Promise<Product> {
    return await this.productService.delete(id, userId);
  }

  // https://www.youtube.com/watch?v=GE7RjyO3w68
  @Post()
  @UseInterceptors(FilesInterceptor("image"))
  UploadedFile(@UploadedFile() file) {
    console.log(file);
  }
}
