import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Produto from './Produto.js';

@Entity()
export default class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nome!: string;

  @Column({ type: 'varchar', nullable: true })
  descricao?: string;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  // A função acima diz que @OneToMany "produtos!: Produto[]" deve se conectar com "produto.categoria" que por sua vez é um
  // @ManyToOne na entidade Produto
  produtos!: Produto[];
}
