import { useState, useRef } from 'react'  // Importa os hooks useState e useRef do React para gerenciamento de estado e referências.
import './Gamee.css'  // Importa o arquivo CSS para estilização do componente Gamee.

const Gamee = ({  // Define o componente Gamee e recebe várias props que são passadas para ele.
    verifyLetter,  // Função para verificar a letra adivinhada pelo jogador.
    pickedWord,  // A palavra que o jogador deve adivinhar.
    pickedCategory,  // A categoria da palavra escolhida.
    letters,  // As letras da palavra.
    guessedLetters,  // As letras que o jogador já adivinhou corretamente.
    wrongLetters,  // As letras que o jogador adivinhou incorretamente.
    guesses,  // O número de tentativas restantes.
    score  // A pontuação atual do jogador.
}) => {
    const [letter, setLetter] = useState("")  // Estado que armazena a letra que o jogador digitou.
    const letterInputRef = useRef(null)  // Cria uma referência para o campo de entrada da letra, permitindo acesso direto ao elemento.

    const handleSubmit = (e) => {  // Função que trata o envio do formulário quando o jogador tenta adivinhar uma letra.
        e.preventDefault()  // Previne o comportamento padrão do formulário que recarregaria a página.

        verifyLetter(letter)  // Chama a função verifyLetter, passando a letra digitada pelo jogador.

        setLetter("")  // Reseta o estado da letra para uma string vazia, limpando o campo de entrada.

        letterInputRef.current.focus()  // Coloca o foco de volta no campo de entrada da letra após o envio.
    }

    return (  // Renderiza a interface do jogo.
     <div className='game'>  {/**Cria uma div com a classe 'game' para envolver todo o conteúdo do jogo. */} 
        <p className='points'>  {/*/ Parágrafo para exibir a pontuação atual do jogador. */}
            <span>Pontuação: {score}</span>  {/** Exibe a pontuação atual, acessando a prop score. */}
        </p>
        <h1>Adivinhe a palavra:</h1>  {/**Título que indica que o jogador deve adivinhar a palavra. */}
        <h3 className='tip'>  {/**Subtítulo para dar uma dica sobre a palavra. */}
            Dica sobre a palavra: <span>{pickedCategory}</span>  {/**Exibe a categoria da palavra escolhida. */}
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>  {/**Informa ao jogador quantas tentativas ainda restam. */}
        <div className='wordContainer'>  {/**Divisão que contém as letras da palavra a ser adivinhada. */}
          {letters.map((letter, i) => (  // Mapeia cada letra da palavra.
            guessedLetters.includes(letter) ? (  // Verifica se a letra já foi adivinhada corretamente.
                <span key={i} className="letter">{letter}</span>  // Se adivinhada, exibe a letra.
            ) : (
                <span key={i} className="blankSquare"></span>  // Se não adivinhada, exibe um espaço em branco.
            )
          ))}
        </div>
        <div className='letterContainer'>   {/**Divisão que contém a interface para o jogador tentar adivinhar uma letra. */}
            <p>Tente adivinhar uma letra da palavra:</p>  {/**Instrução para o jogador. */}
            <form onSubmit={handleSubmit}>   {/**Formulário que chama a função handleSubmit ao ser enviado. */}
                <input type="text"  // Campo de entrada para o jogador digitar uma letra.
                name='letter'  // Nome do campo de entrada.
                maxLength="1"  // Limita o número de caracteres a 1.
                required  // Torna o campo obrigatório para o envio do formulário.
                onChange={(e) => setLetter(e.target.value)}  // Atualiza o estado da letra conforme o jogador digita.
                value={letter}  // O valor do campo de entrada é controlado pelo estado letter.
                ref={letterInputRef}  // A referência é passada para o campo de entrada.
                />
                <button>Jogar</button>  {/**Botão para enviar a letra adivinhada. */}
            </form>
        </div>
        <div className='wrongLettersContainer'>  {/** Divisão que exibe as letras que o jogador já tentou e errou. */}
            <p>Letras já utilizadas</p>  {/** Instrução para mostrar as letras erradas. */}
            {wrongLetters.map((letter, i) => (  // Mapeia as letras erradas.
                <span key={i}>{letter}, </span>  // Exibe cada letra errada, separando-as por vírgulas.
            ))}
        </div>
     </div>
    )
}

export default Gamee  // Exporta o componente Gamee para ser utilizado em outros arquivos.
