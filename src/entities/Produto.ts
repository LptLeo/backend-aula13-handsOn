import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Categoria from './Categoria.js';

@Entity()
export default class Produto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  nome!: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  descricao?: string;

  @Column({ type: 'decimal', nullable: false })
  preco!: number;

  @Column({ type: 'integer', nullable: false })
  estoque!: number;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao?: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  // A função acima diz que o @ManyToOne "categoria!: Categoria" deve se conectar com "categoria.produtos" que por sua vez é um
  // @OneToMany na entidade Categoria
  categoria!: Categoria;
}
