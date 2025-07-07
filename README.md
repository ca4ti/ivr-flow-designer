# Designer de Fluxo IVR (URA)

## Desenvolvedor

* **Nome:** Carlos Alberto
* **Contato (Telefone/WhatsApp):** +55 11 2615-2880

## Motivação

Este projeto nasceu de uma necessidade prática observada no dia a dia: a dificuldade que equipes comerciais e clientes enfrentam para especificar e solicitar a configuração de um fluxo de IVR (URA). Muitas vezes, a ausência de uma ferramenta simples para criar um rascunho validado resultava em longos processos de idas e vindas, atrasos e configurações que não atendiam plenamente às expectativas do cliente.

O **Designer de Fluxo IVR** foi criado para preencher essa lacuna. A aplicação serve como uma ponte entre a visão do cliente e a implementação técnica, permitindo que vendedores, gestores e os próprios clientes possam, de forma colaborativa e visual, desenhar o fluxo de atendimento desejado. O resultado é um arquivo de configuração claro e preciso, pronto para ser enviado à equipe técnica, garantindo agilidade e assertividade na implantação.

## Descrição

O **Designer de Fluxo IVR** é uma aplicação web visual e interativa, construída com React, que capacita equipes a criar, gerenciar e exportar fluxos de Unidade de Resposta Audível (URA). Com uma interface intuitiva de arrastar e soltar (drag-and-drop), a ferramenta simplifica o design da lógica de atendimento telefônico, permitindo configurar nós de decisão (como horários, menus de opções) e direcionar chamadas para filas ou agentes específicos.

## Funcionalidades Principais

* **Interface Visual e Intuitiva**:
    * Canvas (área de desenho) com funcionalidades de Pan (arrastar) e Zoom para facilitar a navegação em fluxos complexos.
    * Criação de nós de diferentes tipos: Início, Calendário, IVR, Fila de Agentes e Usuário.
    * Conexão visual entre os nós para definir a lógica e a jornada do atendimento.

* **Configuração Detalhada de Propriedades**:
    * Painel de propriedades dinâmico para configurar cada nó de forma granular.
    * Definição de números de telefone, horários de funcionamento, feriados, menus DTMF, e mais.
    * Adição e remoção dinâmica de itens, como opções de menu ou agentes em uma fila.

* **Portabilidade e Integração**:
    * **Exportar Fluxo**: Salva o design completo em um arquivo `ivr_flow.json`, servindo como documentação e arquivo de configuração.
    * **Importar Fluxo**: Carrega um design previamente salvo, permitindo edições e reutilização.
    * **Limpar Tudo**: Reseta a área de trabalho para um novo projeto.

* **Simulação de Envio por Email**:
    * Funcionalidade para configurar parâmetros SMTP e simular o envio do fluxo JSON para um destinatário, facilitando o compartilhamento do rascunho final.

## Tecnologias Utilizadas

* **Frontend**:
    * **React**: Biblioteca principal para a construção da interface de usuário.
    * **React Hooks**: Para gerenciamento de estado e ciclo de vida dos componentes (`useState`, `useRef`, `useEffect`, `useCallback`).
    * **HTML5 Canvas**: Para renderizar as conexões entre os nós.
    * **Tailwind CSS**: Framework para estilização rápida e responsiva.
* **Bibliotecas**:
    * **Google Fonts** (Inter)

## Como Usar

1.  **Acesso Rápido**:
    ```bash
    # Clone o repositório
    git clone [https://github.com/ca4ti/ivr-flow-designer.git](https://github.com/ca4ti/ivr-flow-designer.git)
    cd ivr-flow-designer
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Inicie a aplicação**:
    ```bash
    npm start
    ```
4.  A aplicação estará disponível em `http://localhost:3000`.

## Roadmap

-   [x] **Interface de Simulação SMTP**: Implementada a interface para configuração de SMTP e simulação de envio do fluxo por email.
-   [ ] **Backend para Envio de Email**: Desenvolver um serviço de backend para integrar com a interface SMTP e realizar o envio real do fluxo JSON.
-   [ ] **Expansão de Componentes de Fluxo**: Adicionar novos tipos de nós para cenários mais complexos, como:
    -   "Coletar Dados" (para capturar entradas do usuário, como CPF).
    -   "Transferência Externa" (para encaminhar para outros números).
    -   "Integração API" (para consultar sistemas externos durante o fluxo).
-   [ ] **Validação de Lógica**: Implementar um sistema para validar o fluxo em tempo real, detectando nós sem conexão ou loops infinitos.
-   [ ] **Persistência de Dados**: Integrar com uma API e banco de dados para salvar e carregar os fluxos de forma segura.
-   [ ] **Autenticação de Usuários**: Permitir que usuários se cadastrem para salvar e gerenciar seus projetos de fluxo de forma privada.

## Contribuição

1.  Faça um fork do projeto.
2.  Crie sua branch (`git checkout -b feature/nova-funcionalidade`).
3.  Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4.  Push para a branch (`git push origin feature/nova-funcionalidade`).
5.  Abra um Pull Request.

## Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais informações.

## Contato

Carlos Alberto - [Telefone/WhatsApp] +55 11 2615-2880
Projeto: [https://github.com/ca4ti/ivr-flow-designer](https://github.com/ca4ti/ivr-flow-designer)

