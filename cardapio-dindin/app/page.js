// 1. Importar o nosso cliente Supabase
import { supabase } from "../lib/supabaseClient"; // Usamos @/ que é um atalho para a raiz do projeto

// 2. Transformamos a página em um componente "async"
// Isso permite que a gente "espere" o banco de dados responder
// antes de construir a página. (Isso é um Server Component do Next.js)
export default async function Home() {
  // 3. Esta é a consulta (Query) ao Supabase
  // Estamos pedindo:
  // "Da tabela 'produtos', selecione o id, nome, preco,
  //  e da tabela 'categorias' relacionada, pegue o 'nome' "
  const { data: produtos, error } = await supabase.from("produtos").select(`
      id,
      nome,
      preco,
      categorias ( nome )
    `);

  // Se der erro na busca, mostramos no console do servidor
  if (error) {
    console.error("Erro ao buscar produtos:", error);
  }

  // 4. Esta é a parte visual (HTML/JSX)
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Cardápio de Dindin</h1>

      {/* 5. Verificamos se temos produtos */}
      {produtos && produtos.length > 0 ? (
        // 6. Criamos uma lista
        <ul>
          {/* 7. Usamos .map() para criar um item <li> para cada produto */}
          {produtos.map((produto) => (
            <li key={produto.id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">{produto.nome}</h2>

              {/* Mostra a categoria (se tiver) */}
              <p className="text-gray-600">{produto.categorias.nome}</p>

              {/* Formata o preço para Real (R$) */}
              <p className="text-lg font-medium mt-2">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.preco)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        // 8. Mensagem caso não encontre produtos
        <p>Nenhum produto encontrado no cardápio.</p>
      )}
    </main>
  );
}
