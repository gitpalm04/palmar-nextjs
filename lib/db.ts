import mysql from "mysql2/promise";

// Debug: mostrar configuração (sem a senha completa)
console.log("[v0] MySQL Config:", {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  passwordLength: process.env.MYSQL_PASSWORD?.length,
  passwordFirst3: process.env.MYSQL_PASSWORD?.substring(0, 3),
});

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// Tipos do banco de dados
export type StatusImovel =
  | "disponivel"
  | "vendido"
  | "reservado"
  | "em_construcao";

export type TipoImovel =
  | "apartamento"
  | "casa"
  | "terreno"
  | "comercial"
  | "cobertura";
  
export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: "admin" | "editor";
  created_at: Date;
  updated_at: Date;
}

export interface Imovel {
  id: number;
  titulo: string;
  slug: string;
  descricao: string | null;
  tipo: "apartamento" | "casa" | "terreno" | "comercial" | "cobertura";
  status: "disponivel" | "vendido" | "reservado" | "em_construcao";
  preco: number | null;
  area_total: number | null;
  area_construida: number | null;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;
  endereco: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
  destaque: boolean;
  ativo: boolean;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface ImovelImagem {
  id: number;
  imovel_id: number;
  url: string;
  alt: string | null;
  ordem: number;
  principal: boolean;
  created_at: Date;
}

export interface ImovelCaracteristica {
  id: number;
  imovel_id: number;
  caracteristica: string;
}

export interface ImovelCompleto extends Imovel {
  imagens: ImovelImagem[];
  caracteristicas: string[];
  imagem_principal?: string;
}
