import { appDataSource } from '../database/dataSource.js';
import Categoria from '../entities/Categoria.js';

class CategoriaService {
  private categoriaRepo = appDataSource.getRepository(Categoria);

  // CREATE
  public async create(data: any) {
    // Verifica se já existe uma categoria com o mesmo nome
    if (await this.categoriaRepo.findOne({ where: { nome: data.nome } })) {
      throw new Error('Já existe uma categoria com esse nome');
    }

    // Cria e salva a nova categoria
    const novaCategoria = this.categoriaRepo.create(data);

    return await this.categoriaRepo.save(novaCategoria);
  }

  // READ
  public async getAllCategorias() {
    // Retorna todas as categorias com seus produtos relacionados
    const categorias = await this.categoriaRepo.find({
      relations: ['produtos'],
    });

    if (categorias.length === 0) {
      throw new Error('Nenhuma categoria registrada');
    }

    return categorias;
  }

  // UPDATE
  public async updateCategoria(id: string, data: any) {
    // Verifica se a categoria existe e atribui os produtos relacionados
    const categoriaExistente = await this.categoriaRepo.findOne({
      where: { id },
      relations: ['produtos'],
    });

    // Se não existir, lança um erro
    if (!categoriaExistente) {
      throw new Error('Categoria não encontrada');
    }

    // Verifica se o novo nome já está em uso por outra categoria
    if (data.nome && data.nome != categoriaExistente.nome) {
      const nomeExistente = await this.categoriaRepo.findOne({
        where: { nome: data.nome },
      });

      // Se o nome já estiver em uso, lança um erro
      if (nomeExistente) {
        throw new Error('Já existe uma categoria com esse nome');
      }
    }

    // Atualiza e salva a categoria
    this.categoriaRepo.merge(categoriaExistente, data);

    return await this.categoriaRepo.save(categoriaExistente);
  }

  // DELETE
  public async deleteCategoria(id: string) {
    // Verifica se a categoria existe e atribui os produtos relacionados
    const categoriaExistente = await this.categoriaRepo.findOne({
      where: { id },
      relations: ['produtos'],
    });

    // Se não existir, lança um erro
    if (!categoriaExistente) {
      throw new Error('Categoria não encontrada');
    }

    // Verifica se a categoria possui produtos associados
    if (categoriaExistente.produtos.length > 0) {
      throw new Error(
        'Não é possível deletar uma categoria que possui produtos associados',
      );
    }

    await this.categoriaRepo.delete(id);
  }
}

export default CategoriaService;
