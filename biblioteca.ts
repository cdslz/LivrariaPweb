interface ILivros {
  titulo: string;
  autor: string;
  ano: number;
  isbn: string;
  preco: number;
  editora: string;
  estoque: number;

  exibirDados(): void;
  atualizarEstoque(estoque: number): void;
}

class LivroFisico implements ILivros {
  titulo: string;
  autor: string;
  ano: number;
  isbn: string;
  preco: number;
  editora: string;
  estoque: number;

  constructor(
    titulo: string,
    autor: string,
    ano: number,
    isbn: string,
    preco: number,
    editora: string,
    estoque: number
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.isbn = isbn;
    this.preco = preco;
    this.editora = editora;
    this.estoque = estoque;
  }
  exibirDados(): void {
    console.log(`Exibindo dados do Livro Físico:`);
    console.log(`Título: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Preço: ${this.preco}`);
    console.log(`Editora: ${this.editora}`);
    console.log(`Estoque: ${this.estoque}`);
  }
  atualizarEstoque(estoque: number): void {
    this.estoque += estoque;
    console.log(`O estoque foi atualizado. ${estoque}`);
  }
}

class Ebook implements ILivros {
  titulo: string;
  autor: string;
  ano: number;
  isbn: string;
  preco: number;
  editora: string;
  estoque: number;
  private tamArquivo: number;

  constructor(
    titulo: string,
    autor: string,
    ano: number,
    isbn: string,
    preco: number,
    editora: string,
    estoque: number,
    tamArquivo: number
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.isbn = isbn;
    this.preco = preco;
    this.editora = editora;
    this.estoque = estoque;
    this.tamArquivo = tamArquivo;
  }

  exibirDados(): void {
    console.log(`Exibindo dados do Ebook:`);
    console.log(`Título: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Preço: ${this.preco}`);
    console.log(`Editora: ${this.editora}`);
    console.log(`Estoque: ${this.estoque}`);
    console.log(`Tamanho do Arquivo: ${this.tamArquivo} mb`);
  }
  atualizarEstoque(estoque: number): void {
    this.estoque += estoque;
    console.log(`O estoque foi atualizado: ${estoque}`);
  }
}

/*const livro1 = new LivroFisico(
  "A Hora da Estrela",
  "Clarice Lispector",
  1990,
  "if258",
  200,
  "Simplica",
  5
);
const livro2 = new Ebook(
  "A Cinco Passos de Você",
  "Maria Luisa",
  2008,
  "if777",
  50,
  "Simplica",
  2,
  20
);
console.log("\nLivro 1:");
livro1.exibirDados();
console.log("\nLivro 2:");
livro2.exibirDados();
*/

class Biblioteca {
  private acervo: ILivros[] = [];

  public adicionarLivro(livro: ILivros): void {
    const livroExistente = this.acervo.find((item) => item.isbn === livro.isbn);

    if (livroExistente) {
      console.warn(
        `O livro "${livro.titulo}" já existe. O estoque será atualizado.`
      );
      livroExistente.atualizarEstoque(livro.estoque);
    } else {
      this.acervo.push(livro);
      console.log(`O livro "${livro.titulo}" foi adicionado à biblioteca.`);
    }
  }

  public venderLivro(isbn: string, quantidade: number): void {
    const livro = this.acervo.find((item) => item.isbn === isbn);

    if (!livro) {
      console.error(`O livro com o ISBN "${isbn}" não foi encontrado.`);
      return;
    }
    if (livro.estoque < quantidade) {
      console.error(
        `Estoque insuficiente para o livro "${livro.titulo}". Apenas ${livro.estoque} disponíveis.`
      );
      return;
    }

    livro.atualizarEstoque(-quantidade);
    console.log(
      `Venda de ${quantidade} livro(s) "${livro.titulo}" realizada! Estoque atual: ${livro.estoque}.`
    );
  }

  public excluirLivro(isbn: string): void {
    const tamanhoOriginal = this.acervo.length;
    this.acervo = this.acervo.filter((livro) => livro.isbn !== isbn);

    if (this.acervo.length < tamanhoOriginal) {
      console.log(`O livro com o ISBN "${isbn}" foi excluído.`);
    } else {
      console.error(
        `O livro com o ISBN "${isbn}" não foi encontrado para ser excluído.`
      );
    }
  }

  public listarAcervo(): void {
    console.log("\nAcervo da Biblioteca");
    if (this.acervo.length === 0) {
      console.log("O acervo está vazio.");
    } else {
      this.acervo.forEach((livro) => {
        livro.exibirDados();
      });
    }
  }
}

const livroFisico1 = new LivroFisico(
  "A Hora da Estrela",
  "Clarice Lispector",
  1990,
  "if258",
  45.0,
  "Simplica",
  10
);
const ebook1 = new Ebook(
  "A Cinco Passos de Você",
  "Rachael Lippincott",
  2018,
  "if777",
  30.0,
  "Simplica",
  100,
  20
);
const livroFisico2 = new LivroFisico(
  "O Cortiço",
  "Aluísio Azevedo",
  1890,
  "if123",
  25.5,
  "Clássicos BR",
  15
);

const minhaBiblioteca = new Biblioteca();

minhaBiblioteca.adicionarLivro(livroFisico1);
minhaBiblioteca.adicionarLivro(ebook1);
minhaBiblioteca.adicionarLivro(livroFisico2);

minhaBiblioteca.listarAcervo();

console.log("\n--- REALIZANDO OPERAÇÕES NA BIBLIOTECA ---");
minhaBiblioteca.venderLivro("if258", 3); // Venda bem-sucedida
minhaBiblioteca.venderLivro("if123", 20); // Tentativa de venda com estoque insuficiente
minhaBiblioteca.excluirLivro("if777"); // Exclui o Ebook

//Mostrando como ficou o acervo da biblioteca.
minhaBiblioteca.listarAcervo();
