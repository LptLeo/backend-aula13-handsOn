import { appDataSource } from '../database/dataSource.js';
import Categoria from '../entities/Categoria.js';
import Produto from '../entities/Produto.js';

class ProdutoService {
  private produtoRepo = appDataSource.getRepository(Produto);
  private categoriaRepo = appDataSource.getRepository(Categoria);

  // create
  public async create(data: any) {
    // id da categoria na requisição
    // procura categoria que tem o id passado em data
    const categoriaExistente = await this.categoriaRepo.findOne({
      where: { id: data.categoria },
    });

    // Erro se categoria não existir
    if (!categoriaExistente) {
      throw new Error('A categoria informada não existe');
    }

    // instancia novo produto com a categoria
    const novoProduto = this.produtoRepo.create({
      ...data,
      categoria: categoriaExistente,
    });

    // salva o produto com a categoria no data base
    await this.produtoRepo.save(novoProduto);

    return novoProduto;
  }

  // read
  public async getAllProdutos() {
    return this.produtoRepo.find({
      relations: ['categoria'],
    });
  }

  // update
  public async updateProduto(id: string, data: any) {
    const produtoExistente = await this.produtoRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produtoExistente) {
      throw new Error('Produto não encontrado');
    }

    if (data.categoria) {
      const categoriaExistente = await this.categoriaRepo.findOne({
        where: { id: data.categoria },
      });

      if (!categoriaExistente) {
        throw new Error('A categoria informada não existe');
      }

      data.categoria = categoriaExistente;
    }

    const produtoAtualizado = this.produtoRepo.merge(produtoExistente, data);

    await this.produtoRepo.save(produtoAtualizado);

    return produtoAtualizado;
  }

  // delete
  public async deleteProduto(id: string) {
    const produtoExistente = await this.produtoRepo.findOne({
      where: { id },
    });

    if (!produtoExistente) {
      throw new Error('Produto não encontrado');
    }

    await this.produtoRepo.remove(produtoExistente);
  }
}

export default ProdutoService;
