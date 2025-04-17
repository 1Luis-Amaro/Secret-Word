//CSS
import './App.css'; // Importa o arquivo CSS para aplicar estilos ao componente.

//React
import { useCallback, useEffect, useState } from 'react' // Importa hooks do React: useCallback, useEffect, e useState para gerenciar estado e efeitos colaterais.

//data = os dados...
import { wordsList } from './data/words' // Importa uma lista de palavras de um arquivo de dados para uso no jogo.

//components
import StartScreen from './components/StartScreen'; // Importa o componente que mostra a tela inicial do jogo.
import Gamee from './components/Gamee'; // Importa o componente responsável pelo jogo em si.
import GameOver from './components/GameOver'; // Importa o componente que mostra a tela de fim de jogo.

// Define os estágios do jogo em um array de objetos.
const stages = [
  { id: 1, name: "start" }, // Estágio inicial (tela de início).
  { id: 2, name: "game" },  // Estágio do jogo em execução.
  { id: 3, name: "end" },   // Estágio de fim de jogo.
]

const guessesQty = 3 // Define o número de tentativas permitidas como 3.

function App() {
  // useState para controlar o estágio atual do jogo, começando com o estágio inicial.
  const [gameStage, setGameStage] = useState(stages[0].name) // Define o estágio do jogo, começando pela tela inicial.

  const [words] = useState(wordsList) // Estado que guarda a lista de palavras importada (não será alterada).

  const [pickedWord, setPickedWord] = useState("") // Estado para armazenar a palavra escolhida aleatoriamente.
  const [pickedCategory, setPickedCategory] = useState("") // Estado para armazenar a categoria da palavra escolhida.
  const [letters, setLetters] = useState([]) // Estado que guarda as letras da palavra escolhida.

  const [guessedLetters, setGuessedLetters] = useState([]) // Estado para armazenar as letras corretas que o jogador adivinhou.
  const [wrongLetters, setWrongdLetters] = useState([]) // Estado para armazenar as letras erradas que o jogador adivinhou.
  const [guesses, setGuesses] = useState(guessesQty) // Estado para armazenar quantas tentativas restam.
  const [score, setScore] = useState(0) // Estado para armazenar a pontuação do jogador.

  // Função para escolher uma palavra e sua categoria aleatoriamente. Usa o useCallback para memorizar a função.
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words) // Pega todas as categorias da lista de palavras.
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] // Escolhe uma categoria aleatória.

    const word = words[category][Math.floor(Math.random() * words[category].length)] // Escolhe uma palavra aleatória dentro da categoria escolhida.

    return { word, category } // Retorna a palavra e a categoria escolhidas.
  }, [words]) // A função é recriada apenas se 'words' mudar (por ser memorável com useCallback).

  // Função para iniciar o jogo, também usa useCallback para evitar recriação desnecessária.
  const startGame = useCallback(() => {
    clearLetterStates() // Limpa os estados de letras corretas e erradas do jogo anterior.

    const { word, category } = pickWordAndCategory() // Chama a função para escolher uma nova palavra e categoria.

    let wordLetters = word.split("") // Divide a palavra em um array de letras individuais.

    wordLetters = wordLetters.map((l) => l.toLowerCase()) // Converte todas as letras para minúsculas para padronização.

    setPickedWord(word) // Define a palavra escolhida no estado.
    setPickedCategory(category) // Define a categoria da palavra escolhida no estado.
    setLetters(wordLetters) // Define as letras da palavra escolhida no estado.

    setGameStage(stages[1].name) // Altera o estágio do jogo para o estágio "game" (jogo em execução).
  }, [pickWordAndCategory]) // Dependente de 'pickWordAndCategory' para garantir que esteja atualizado.

  // Função para verificar se a letra adivinhada está correta ou errada.
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase() // Normaliza a letra, convertendo para minúscula.

    // Verifica se a letra já foi adivinhada antes, seja correta ou errada.
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return // Se já foi adivinhada, a função retorna sem fazer nada.
    }

    // Se a letra estiver na palavra, adiciona ao array de letras adivinhadas corretamente.
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, // Mantém as letras adivinhadas anteriormente.
        normalizedLetter // Adiciona a nova letra correta.
      ])
    } else {
      // Se a letra estiver errada, adiciona ao array de letras erradas.
      setWrongdLetters((actualWrongLetters) => [
        ...actualWrongLetters, // Mantém as letras erradas anteriormente.
        normalizedLetter // Adiciona a nova letra errada.
      ])

      setGuesses((actualGuesses) => actualGuesses - 1) // Reduz o número de tentativas restantes em 1.
    }
  }

  // Função para limpar os estados de letras corretas e erradas.
  const clearLetterStates = () => {
    setGuessedLetters([]) // Limpa as letras adivinhadas corretamente.
    setWrongdLetters([]) // Limpa as letras erradas.
  }

  // useEffect para verificar se o número de tentativas chegou a zero.
  useEffect(() => {
    if (guesses <= 0) { // Se as tentativas restantes forem zero ou menos...
      clearLetterStates() // Limpa os estados das letras.
      setGameStage(stages[2].name) // Muda o estágio do jogo para "end" (fim de jogo).
    }
  }, [guesses]) // Executa este efeito toda vez que o estado 'guesses' mudar.

  // useEffect para verificar a condição de vitória.
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)] // Cria um array de letras únicas da palavra.

    if (guessedLetters.length === uniqueLetters.length) { // Se o número de letras adivinhadas for igual ao número de letras únicas...
      setScore((actualScore) => actualScore + 100) // Aumenta a pontuação em 100.
      startGame() // Reinicia o jogo com uma nova palavra.
    }
  }, [guessedLetters, letters, startGame]) // Executa este efeito quando 'guessedLetters', 'letters' ou 'startGame' mudarem.

  // Função para reiniciar o jogo.
  const retry = () => {
    setScore(0) // Reseta a pontuação para zero.
    setGuesses(guessesQty) // Reseta o número de tentativas para o valor inicial.
    setGameStage(stages[0].name) // Muda o estágio do jogo de volta para "start" (tela inicial).
  }

  return (
    <div className="App">
      {/* Renderiza o componente StartScreen se o estágio do jogo for 'start' */}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      
      {/* Renderiza o componente Gamee se o estágio do jogo for 'game' */}
      {gameStage === 'game' && <Gamee 
        verifyLetter={verifyLetter} // Passa a função para verificar as letras.
        pickedWord={pickedWord} // Passa a palavra escolhida.
        pickedCategory={pickedCategory} // Passa a categoria da palavra.
        letters={letters} // Passa as letras da palavra.
        guessedLetters={guessedLetters} // Passa as letras que foram adivinhadas corretamente.
        wrongLetters={wrongLetters} // Passa as letras erradas.
        guesses={guesses} // Passa o número de tentativas restantes.
        score={score} // Passa a pontuação atual.
      />}
      
      {/* Renderiza o componente GameOver se o estágio do jogo for 'end' */}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App; // Exporta o componente App para ser utilizado em outras partes da aplicação.
