import React, { useState, useRef, useEffect, useCallback } from 'react';

// Componente para o Modal de Configurações de Email
const EmailConfigModal = ({
    clientEmail, setClientEmail,
    companyName, setCompanyName,
    smtpSettings, setSmtpSettings,
    isHardcoded, setIsHardcoded,
    onClose
}) => {
    // Função para lidar com a mudança das configurações SMTP
    const handleSmtpChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSmtpSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'port' ? parseInt(value) || 0 : value)
        }));
    };

    // Mensagem de instrução para hardcoding
    const hardcodeInstruction = `
    Para "hardcodar" as configurações de email, você precisaria definir os valores diretamente no código-fonte do componente 'App', removendo os campos de entrada do usuário.

    Exemplo de como ficaria no estado inicial do componente 'App':

    const [clientEmail, setClientEmail] = useState('seu.email.hardcoded@exemplo.com');
    const [companyName, setCompanyName] = useState('Nome da Empresa Hardcoded');
    const [smtpSettings, setSmtpSettings] = useState({
        host: 'smtp.host.hardcoded.com',
        port: 587,
        secure: true,
        user: 'usuario.hardcoded@exemplo.com',
        pass: 'senha_hardcoded'
    });
    const [isHardcoded, setIsHardcoded] = useState(true); // Definir como true para ocultar a UI
    `;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 max-w-lg flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Configurações de Email</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="hardcoded-toggle"
                        checked={isHardcoded}
                        onChange={(e) => setIsHardcoded(e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="hardcoded-toggle" className="ml-2 block text-sm text-gray-900 font-medium">
                        Configurações Hardcoded (ocultar campos)
                    </label>
                </div>

                {isHardcoded && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Instruções para Hardcoding:</p>
                        <pre className="text-sm overflow-auto whitespace-pre-wrap mt-2">{hardcodeInstruction}</pre>
                    </div>
                )}

                {!isHardcoded && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seu Email (Cliente):</label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="seu.email@exemplo.com"
                                disabled={isHardcoded}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome da Empresa do Projeto:</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="Nome da Empresa"
                                disabled={isHardcoded}
                            />
                        </div>
                        <h3 className="font-semibold text-md mt-4 text-gray-800">Configurações SMTP (Backend):</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Host SMTP:</label>
                            <input
                                type="text"
                                name="host"
                                value={smtpSettings.host}
                                onChange={handleSmtpChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="smtp.yourcompany.com"
                                disabled={isHardcoded}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Porta SMTP:</label>
                            <input
                                type="number"
                                name="port"
                                value={smtpSettings.port}
                                onChange={handleSmtpChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="587"
                                disabled={isHardcoded}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuário SMTP:</label>
                            <input
                                type="text"
                                name="user"
                                value={smtpSettings.user}
                                onChange={handleSmtpChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="seu.usuario@exemplo.com"
                                disabled={isHardcoded}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Senha SMTP:</label>
                            <input
                                type="password"
                                name="pass"
                                value={smtpSettings.pass}
                                onChange={handleSmtpChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                placeholder="sua_senha_smtp"
                                disabled={isHardcoded}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="secure"
                                checked={smtpSettings.secure}
                                onChange={handleSmtpChange}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                id="smtp-secure"
                                disabled={isHardcoded}
                            />
                            <label htmlFor="smtp-secure" className="ml-2 block text-sm text-gray-900">Usar conexão segura (SSL/TLS)</label>
                        </div>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition duration-200 ease-in-out"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};


// Tamanho fixo grande para a área de conteúdo para permitir rolagem
const WORKSPACE_INITIAL_SIZE = 4000;

// Componente Principal da Aplicação
const App = () => {
    // Estado para gerenciar todos os nós no fluxo
    const [nodes, setNodes] = useState([]);
    // Estado para gerenciar todas as conexões entre os nós
    const [connections, setConnections] = useState([]);
    // Estado para armazenar o ID do nó atualmente selecionado para edição de propriedades
    const [selectedNodeId, setSelectedNodeId] = useState(null); // Armazena apenas o ID
    // Estado para rastrear se uma conexão está sendo desenhada
    const [drawingConnection, setDrawingConnection] = useState(null); // Estado para re-renderização
    // Referência para o elemento canvas
    const canvasRef = useRef(null);
    // Referência para o contêiner que contém os nós (para cálculos de arrasto)
    const containerRef = useRef(null);
    // Referência para a div de conteúdo dentro do contêiner rolável
    const contentRef = useRef(null);


    // Estado para configuração de e-mail
    const [clientEmail, setClientEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [smtpSettings, setSmtpSettings] = useState({
        host: 'smtp.yourcompany.com',
        port: 587,
        secure: false, // true para 465, false para outras portas
        user: 'seu_email@yourcompany.com',
        pass: 'sua_senha_do_email'
    });
    // Estado para controlar se as configurações são "hardcoded" (apenas para demonstração na UI)
    const [isHardcoded, setIsHardcoded] = useState(false);
    const [showEmailConfigModal, setShowEmailConfigModal] = useState(false);

    // Estado para o formulário de envio de e-mail
    const [recipientEmail, setRecipientEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false); // Novo estado para rastrear tentativa de envio do formulário

    // Estado para pan e zoom
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); // Coordenadas do mundo para pan
    const [zoomLevel, setZoomLevel] = useState(1); // Escala do mundo para zoom

    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 }); // Coordenadas da tela para o início do pan

    const [draggingNodeId, setDraggingNodeId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Coordenadas da tela para o offset de arrasto do nó


    // Dimensões do nó (constante em coordenadas do mundo)
    const NODE_WIDTH = 180;
    const NODE_HEIGHT = 100;
    const NODE_PADDING = 100; // Preenchimento extra para as dimensões do contentRef para garantir espaço de rolagem

    // Utilitário para gerar um ID único para novos nós
    const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Função para adicionar um novo nó ao canvas
    const addNode = (type, worldX, worldY) => {
        const newNode = {
            id: generateId(),
            type,
            x: worldX, // Usar worldX diretamente
            y: worldY, // Usar worldY diretamente
            // Propriedades padrão baseadas no tipo de nó
            properties: {
                ...(type === 'start' && { phoneNumbers: [{ id: generateId(), value: '+55 (XX) XXXXX-XXXX' }] }),
                ...(type === 'calendar' && {
                    openTimes: [{ id: generateId(), day: 'Seg-Sex', start: '09:00', end: '18:00' }],
                    closedTimes: [{ id: generateId(), day: 'Sab-Dom', start: '00:00', end: '23:59' }],
                    holidays: [{ id: generateId(), date: '01/01' }]
                }),
                ...(type === 'ivr' && {
                    audioText: 'Bem-vindo! Digite sua opção.', // Texto de áudio padrão
                    dtmfOptions: [{ id: generateId(), key: '1', label: 'Vendas', target: null }], // Opção DTMF inicial com ID único
                    noResponseTarget: null,
                    incorrectInputTarget: null
                }),
                // Inicializar array de agentes para o tipo de nó agentQueue
                ...(type === 'agentQueue' && { name: 'Fila de Vendas', description: 'Atendimento comercial', agents: [{ id: generateId(), name: 'Agente 1', extension: '' }] }),
                ...(type === 'user' && { name: 'João Silva', extension: '1234' })
            }
        };
        setNodes(prevNodes => [...prevNodes, newNode]);
    };

    // Função para atualizar propriedades do nó
    const updateNodeProperties = (nodeId, newProps) => {
        setNodes(prevNodes => {
            const updatedNodes = prevNodes.map(node =>
                node.id === nodeId ? { ...node, properties: { ...node.properties, ...newProps } } : node
            );
            return updatedNodes;
        });
    };

    // Função para deletar um nó e suas conexões associadas
    const deleteNode = (nodeId) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
        setConnections(prevConnections =>
            prevConnections.filter(conn => conn.fromNodeId !== nodeId && conn.toNodeId !== nodeId)
        );
        if (selectedNodeId === nodeId) {
            setSelectedNodeId(null);
        }
    };

    // --- Funcionalidade de Arrastar e Soltar Nó ---
    const handleNodeMouseDown = useCallback((e, nodeId) => {
        e.stopPropagation(); // Previne o arrasto do canvas ao clicar em um nó
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
            const nodeElement = e.currentTarget;
            setDraggingNodeId(nodeId);
            // Offset relativo ao canto superior esquerdo do nó em coordenadas de tela
            setDragOffset({
                x: (e.clientX - nodeElement.getBoundingClientRect().left),
                y: (e.clientY - nodeElement.getBoundingClientRect().top)
            });
            setSelectedNodeId(nodeId);
        }
    }, [nodes]);

    const handleMouseMove = useCallback((e) => {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();

        if (draggingNodeId) { // Nó está sendo arrastado
            requestAnimationFrame(() => {
                // Calcular nova posição da tela relativa à viewport do contêiner
                let newScreenX = e.clientX - containerRect.left - dragOffset.x;
                let newScreenY = e.clientY - containerRect.top - dragOffset.y;

                // Converter posição da tela para coordenadas do mundo (não escaladas, não panadas)
                let newWorldX = (newScreenX - panOffset.x) / zoomLevel;
                let newWorldY = (newScreenY - panOffset.y) / zoomLevel;

                setNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === draggingNodeId ? { ...node, x: newWorldX, y: newWorldY } : node
                    )
                );
            });
        } else if (isDraggingCanvas) { // Canvas está sendo panado
            const dx = e.clientX - startPanPoint.x;
            const dy = e.clientY - startPanPoint.y;

            setPanOffset(prev => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));
            setStartPanPoint({ x: e.clientX, y: e.clientY }); // Atualizar ponto inicial para arrasto contínuo
        } else if (drawingConnection) { // Conexão está sendo desenhada
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            setDrawingConnection(prev => ({
                ...prev,
                // Ponto final é a posição do mouse relativa ao canvas, convertida para coordenadas do mundo
                endX: (e.clientX - rect.left - panOffset.x) / zoomLevel,
                endY: (e.clientY - rect.top - panOffset.y) / zoomLevel
            }));
        }
    }, [draggingNodeId, dragOffset, isDraggingCanvas, startPanPoint, drawingConnection, panOffset, zoomLevel, nodes]);

    const handleMouseUp = useCallback(() => {
        setDraggingNodeId(null);
        setIsDraggingCanvas(false);
        if (drawingConnection && !drawingConnection.toNodeId) {
            setDrawingConnection(null);
        }
    }, [drawingConnection]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // --- Lógica de Pan e Zoom do Canvas ---
    const handleCanvasMouseDown = useCallback((e) => {
        // Iniciar pan apenas se clicar no fundo, não em um nó ou handle
        if (e.target === containerRef.current || e.target === canvasRef.current || e.target === contentRef.current) {
            setIsDraggingCanvas(true);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
            setSelectedNodeId(null); // Desselecionar nó ao clicar no fundo do canvas
        }
    }, []);

    const handleWheel = useCallback((e) => {
        e.preventDefault(); // Prevenir rolagem da página
        const scaleAmount = e.deltaY * -0.001; // Ajustar sensibilidade do zoom
        setZoomLevel(prevScale => {
            const newScale = Math.max(0.1, Math.min(prevScale + scaleAmount, 3)); // Limitar nível de zoom

            // Calcular posição do mouse relativa à viewport do contêiner
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const mouseY = e.clientY - containerRect.top;

            // Ajustar offset do pan para zoomar em direção ao cursor do mouse
            // new_pan_x = mouse_x - (mouse_x - old_pan_x) * (new_scale / old_scale)
            setPanOffset(prevPan => ({
                x: mouseX - ((mouseX - prevPan.x) * (newScale / prevScale)),
                y: mouseY - ((mouseY - prevPan.y) * (newScale / prevScale))
            }));

            return newScale;
        });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, [handleWheel]);


    // --- Funcionalidade de Desenho do Canvas ---
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const contentDiv = contentRef.current;

        if (!contentDiv) return;

        // Definir dimensões do canvas para corresponder ao tamanho da div de conteúdo rolável
        canvas.width = contentDiv.scrollWidth;
        canvas.height = contentDiv.scrollHeight;

        ctx.clearRect(0, 0, canvas.width, ctx.canvas.height);

        // Aplicar transformação global (pan e zoom) ao contexto do canvas
        ctx.save();
        ctx.translate(panOffset.x, panOffset.y);
        ctx.scale(zoomLevel, zoomLevel);

        connections.forEach(conn => {
            const fromNode = nodes.find(n => n.id === conn.fromNodeId);
            const toNode = nodes.find(n => n.id === conn.toNodeId);

            if (fromNode && toNode) {
                let startX, startY;
                if (fromNode.type === 'calendar') {
                    const outputIndex = conn.fromOutputId === 'open' ? 0 : conn.fromOutputId === 'closed' ? 1 : 2;
                    startX = fromNode.x + NODE_WIDTH;
                    startY = fromNode.y + (NODE_HEIGHT / 4) * (outputIndex + 1);
                } else if (fromNode.type === 'ivr') {
                    // Encontrar a opção DTMF real pelo seu ID armazenado em conn.fromOutputId
                    const dtmfOption = fromNode.properties.dtmfOptions.find(opt => opt.id === conn.fromOutputId);

                    if (dtmfOption) { // Se for uma opção DTMF
                        const dtmfIndex = fromNode.properties.dtmfOptions.indexOf(dtmfOption);
                        startX = fromNode.x + NODE_WIDTH;
                        startY = fromNode.y + (NODE_HEIGHT / 4) + (dtmfIndex * 20);
                    } else if (conn.fromOutputId === 'noResponse') {
                        startX = fromNode.x + NODE_WIDTH;
                        startY = fromNode.y + NODE_HEIGHT - 30;
                    } else if (conn.fromOutputId === 'incorrectInput') {
                        startX = fromNode.x + NODE_WIDTH;
                        startY = fromNode.y + NODE_HEIGHT - 10;
                    } else {
                        startX = fromNode.x + NODE_WIDTH;
                        startY = fromNode.y + NODE_HEIGHT / 2;
                    }
                } else {
                    startX = fromNode.x + NODE_WIDTH;
                    startY = fromNode.y + NODE_HEIGHT / 2;
                }

                const endX = toNode.x;
                const endY = toNode.y + NODE_HEIGHT / 2;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.bezierCurveTo(
                    startX + 50, startY,
                    endX - 50, endY,
                    endX, endY
                );
                ctx.strokeStyle = '#4A5568';
                ctx.lineWidth = 2;
                ctx.stroke();

                const angle = Math.atan2(endY - startY, endX - startX);
                ctx.fillStyle = '#4A5568';
                ctx.save();
                ctx.translate(endX, endY);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-10, -5);
                ctx.lineTo(0, 0);
                ctx.lineTo(-10, 5);
                ctx.fill();
                ctx.restore();
            }
        });

        if (drawingConnection) { // Ler do estado
            ctx.beginPath();
            ctx.moveTo(drawingConnection.startX, drawingConnection.startY); // Ler do estado
            ctx.lineTo(drawingConnection.endX, drawingConnection.endY); // Ler do estado
            ctx.strokeStyle = '#6B7280';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore(); // Restaurar estado do canvas para remover a transformação global
    }, [nodes, connections, panOffset, zoomLevel, drawingConnection]); // Adicionado panOffset e zoomLevel às dependências

    // Este useEffect é responsável por redesenhar o canvas quando nós/conexões/drawingConnection mudam.
    useEffect(() => {
        draw();
    }, [nodes, connections, drawingConnection, panOffset, zoomLevel, draw]); // Usar versões do estado para acionar re-renderizações

    // Este useEffect é responsável por lidar com eventos de redimensionamento e rolagem do contêiner.
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            draw();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
            const handleScroll = () => {
                draw();
            };
            containerRef.current.addEventListener('scroll', handleScroll);
            return () => {
                containerRef.current.removeEventListener('scroll', handleScroll);
                resizeObserver.unobserve(containerRef.current); // Limpar observador
            };
        }
    }, [draw]);

    // Este useEffect é responsável por atualizar as dimensões da contentDiv com base nos nós e no zoom.
    useEffect(() => {
        const contentDiv = contentRef.current;
        if (!contentDiv || !containerRef.current) return;

        let maxX = 0;
        let maxY = 0;
        nodes.forEach(node => {
            // Estas são coordenadas do mundo, então são relativas a 0,0 da contentDiv
            maxX = Math.max(maxX, node.x + NODE_WIDTH);
            maxY = Math.max(maxY, node.y + NODE_HEIGHT);
        });

        // Calcular o tamanho de conteúdo necessário em *coordenadas do mundo*
        const requiredWorldWidth = maxX + NODE_PADDING;
        const requiredWorldHeight = maxY + NODE_PADDING;

        // Definir as dimensões da contentDiv em *coordenadas do mundo*.
        // Multiplicar por zoomLevel para garantir que a área rolável se expanda corretamente.
        contentDiv.style.width = `${Math.max(WORKSPACE_INITIAL_SIZE, requiredWorldWidth)}px`;
        contentDiv.style.height = `${Math.max(WORKSPACE_INITIAL_SIZE, requiredWorldHeight)}px`;

        // Ajustar a posição de rolagem para manter o conteúdo visível, especialmente após o zoom
        // Esta lógica é mais complexa e pode precisar de ajustes finos com base no comportamento desejado.
        // Por enquanto, vamos confiar no comportamento de rolagem padrão do navegador com a contentDiv expandida.

    }, [nodes, NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, zoomLevel, panOffset]); // Adicionado panOffset às dependências


    const handleOutputMouseDown = useCallback((e, fromNodeId, outputId) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === fromNodeId);
        if (!node) return;

        let startX, startY; // Estas são coordenadas do mundo
        if (node.type === 'calendar') {
            const outputIndex = outputId === 'open' ? 0 : outputId === 'closed' ? 1 : 2;
            startX = node.x + NODE_WIDTH;
            startY = node.y + (NODE_HEIGHT / 4) * (outputIndex + 1);
        } else if (node.type === 'ivr') {
            // outputId aqui é já opt.id (do renderNode) ou 'noResponse'/'incorrectInput'
            const dtmfOption = node.properties.dtmfOptions.find(opt => opt.id === outputId);

            if (dtmfOption) { // Se for uma opção DTMF
                const dtmfIndex = node.properties.dtmfOptions.indexOf(dtmfOption);
                startX = node.x + NODE_WIDTH;
                startY = node.y + (NODE_HEIGHT / 4) + (dtmfIndex * 20);
            } else if (outputId === 'noResponse') {
                startX = node.x + NODE_WIDTH;
                startY = node.y + NODE_HEIGHT - 30;
            } else if (outputId === 'incorrectInput') {
                startX = node.x + NODE_WIDTH;
                startY = node.y + NODE_HEIGHT - 10;
            } else {
                startX = node.x + NODE_WIDTH;
                startY = node.y + NODE_HEIGHT / 2;
            }
        } else {
            startX = node.x + NODE_WIDTH;
            startY = node.y + NODE_HEIGHT / 2;
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const container = containerRef.current;

        setDrawingConnection(prev => ({ // Usar setter personalizado
            fromNodeId: fromNodeId,
            fromOutputId: outputId,
            startX: startX, // Coordenada do mundo
            startY: startY, // Coordenada do mundo
            // Ponto final é a posição do mouse relativa ao canvas, convertida para coordenadas do mundo
            endX: (e.clientX - rect.left - panOffset.x) / zoomLevel,
            endY: (e.clientY - rect.top - panOffset.y) / zoomLevel
        }));
    }, [nodes, setDrawingConnection, panOffset, zoomLevel]);

    const handleInputMouseUp = useCallback((e, toNodeId) => {
        if (drawingConnection) { // Ler do estado
            const { fromNodeId, fromOutputId } = drawingConnection; // Ler do estado

            if (fromNodeId === toNodeId) {
                setDrawingConnection(null); // Usar setter personalizado
                return;
            }

            const existingConnection = connections.find(
                conn => conn.fromNodeId === fromNodeId && conn.fromOutputId === fromOutputId
            );

            if (existingConnection) {
                setConnections(prev => prev.map(conn =>
                    conn.fromNodeId === fromNodeId && conn.fromOutputId === fromOutputId
                        ? { ...conn, toNodeId: toNodeId }
                        : conn
                ));
            } else {
                setConnections(prev => [
                    ...prev,
                    { fromNodeId, fromOutputId, toNodeId }
                ]);
            }
            setDrawingConnection(null); // Usar setter personalizado
        }
    }, [connections, drawingConnection]);

    const renderNode = (node) => {
        const isSelected = selectedNodeId === node.id;

        const NodeContent = () => {
            switch (node.type) {
                case 'start':
                    return (
                        <>
                            <h3 className="font-bold text-lg mb-2">Início</h3>
                            <div className="text-sm">
                                <p>Números:</p>
                                {node.properties.phoneNumbers.map((num) => (
                                    <p key={num.id} className="text-xs">{num.value}</p>
                                ))}
                            </div>
                            {/* Handle de saída */}
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-700"
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'output')}
                            ></div>
                        </>
                    );
                case 'calendar':
                    return (
                        <>
                            <h3 className="font-bold text-lg mb-2">Calendário</h3>
                            <div className="text-sm">
                                <p>Aberto: {node.properties.openTimes.length} config.</p>
                                <p>Fechado: {node.properties.closedTimes.length} config.</p>
                                <p>Feriados: {node.properties.holidays.length} datas</p>
                            </div>
                            {/* Handles de saída */}
                            <div
                                className="absolute right-0 top-1/4 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer border-2 border-green-700"
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'open')}
                            ></div>
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full cursor-pointer border-2 border-red-700"
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'closed')}
                            ></div>
                            <div
                                className="absolute right-0 top-3/4 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full cursor-pointer border-2 border-yellow-700"
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'holiday')}
                            ></div>
                        </>
                    );
                case 'ivr':
                    return (
                        <>
                            <h3 className="font-bold text-lg mb-2">IVR</h3>
                            <p className="text-sm truncate">Áudio: "{node.properties.audioText}"</p>
                            <p className="text-sm">Opções DTMF: {node.properties.dtmfOptions.length}</p>
                            {/* Handles de saída */}
                            {node.properties.dtmfOptions.map((opt) => (
                                <div
                                    key={opt.id} // Usar opt.id diretamente como chave
                                    className="absolute right-0 w-4 h-4 bg-purple-500 rounded-full cursor-pointer border-2 border-purple-700"
                                    style={{ top: `${25 + (node.properties.dtmfOptions.indexOf(opt) * 20)}px` }} // Calcular posição com base no índice atual
                                    onMouseDown={(e) => handleOutputMouseDown(e, node.id, opt.id)} // Passar opt.id como outputId
                                ></div>
                            ))}
                            <div
                                className="absolute right-0 w-4 h-4 bg-gray-500 rounded-full cursor-pointer border-2 border-gray-700"
                                style={{ bottom: '25px' }}
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'noResponse')}
                            ></div>
                            <div
                                className="absolute right-0 w-4 h-4 bg-gray-500 rounded-full cursor-pointer border-2 border-gray-700"
                                style={{ bottom: '5px' }}
                                onMouseDown={(e) => handleOutputMouseDown(e, node.id, 'incorrectInput')}
                            ></div>
                        </>
                    );
                case 'agentQueue':
                    return (
                        <>
                            <h3 className="font-bold text-lg mb-2">Fila de Agente</h3>
                            <p className="text-sm">Nome: {node.properties.name}</p>
                            <p className="text-sm truncate">Agentes: {node.properties.agents.length}</p>
                            {/* Você pode listar os agentes aqui se o espaço permitir */}
                        </>
                    );
                case 'user':
                    return (
                        <>
                            <h3 className="font-bold text-lg mb-2">Usuário</h3>
                            <p className="text-sm">Nome: {node.properties.name}</p>
                            <p className="text-sm">Ramal: {node.properties.extension}</p>
                        </>
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                key={node.id}
                className={`absolute bg-white rounded-lg shadow-lg p-4 cursor-grab border-2 ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}
                style={{
                    left: node.x, // Coordenadas do mundo
                    top: node.y,   // Coordenadas do mundo
                    width: NODE_WIDTH,
                    height: NODE_HEIGHT,
                }}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)} // Gerenciador específico para arrastar nó
                onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
            >
                <NodeContent />
                {/* Input handle (lado esquerdo) */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-400 rounded-full cursor-pointer border-2 border-gray-600"
                    onMouseUp={(e) => handleInputMouseUp(e, node.id)}
                ></div>
                {/* Botão de Excluir (movido para a esquerda) */}
                <button
                    className="absolute top-1 left-1 text-red-500 hover:text-red-700 text-sm font-bold"
                    onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                >
                    &times;
                </button>
            </div>
        );
    };

    // --- Componente do Painel de Propriedades ---
    const PropertyPanel = ({ node, onUpdate, onClose, generateId, nodes }) => {
        if (!node) return null;

        const handleChange = (e) => {
            const { name, value } = e.target;
            onUpdate(node.id, { [name]: value });
        };

        const handleArrayChange = (e, idToUpdate, field, arrayName) => {
            const newArray = node.properties[arrayName].map(item =>
                item.id === idToUpdate ? { ...item, [field || 'value']: e.target.value } : item
            );
            onUpdate(node.id, { [arrayName]: newArray });
        };

        const addArrayItem = (arrayName, newItemTemplate) => {
            onUpdate(node.id, { [arrayName]: [...node.properties[arrayName], { id: generateId(), ...newItemTemplate }] });
        };

        const removeArrayItem = (arrayName, idToRemove) => {
            onUpdate(node.id, { [arrayName]: node.properties[arrayName].filter(item => item.id !== idToRemove) });
        };

        const handleDTMFTargetChange = (e, dtmfId) => {
            const newDtmfOptions = node.properties.dtmfOptions.map(opt =>
                opt.id === dtmfId ? { ...opt, target: e.target.value === "" ? null : e.target.value } : opt
            );
            onUpdate(node.id, { dtmfOptions: newDtmfOptions });
        };

        const handleTargetChange = (e, propertyName) => {
            onUpdate(node.id, { [propertyName]: e.target.value === "" ? null : e.target.value });
        };

        // Opções para seleção de destino (todos os outros nós, exceto o próprio)
        const targetNodeOptions = nodes.filter(n => n.id !== node.id);

        return (
            <div className="bg-white p-4 rounded-lg shadow-xl w-80 fixed right-4 top-4 bottom-4 overflow-y-auto font-inter">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Propriedades do Nó: {node.type.toUpperCase()}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                {node.type === 'start' && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Números de Telefone:</label>
                        {node.properties.phoneNumbers.map((num) => (
                            <div key={num.id} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={num.value}
                                    onChange={(e) => handleArrayChange(e, num.id, 'value', 'phoneNumbers')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                />
                                <button
                                    onClick={() => removeArrayItem('phoneNumbers', num.id)}
                                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('phoneNumbers', { value: '' })}
                            className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Adicionar Número
                        </button>
                    </div>
                )}

                {node.type === 'calendar' && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-md mb-2 text-gray-800">Horários de Abertura:</h3>
                            {node.properties.openTimes.map((time) => (
                                <div key={time.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Ex: Seg-Sex"
                                        value={time.day}
                                        onChange={(e) => handleArrayChange(e, time.id, 'day', 'openTimes')}
                                        className="w-1/3 rounded-md border-gray-300 p-2"
                                    />
                                    <input
                                        type="time"
                                        value={time.start}
                                        onChange={(e) => handleArrayChange(e, time.id, 'start', 'openTimes')}
                                        className="w-1/4 rounded-md border-gray-300 p-2"
                                    />
                                    <input
                                        type="time"
                                        value={time.end}
                                        onChange={(e) => handleArrayChange(e, time.id, 'end', 'openTimes')}
                                        className="w-1/4 rounded-md border-gray-300 p-2"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('openTimes', time.id)}
                                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('openTimes', { day: '', start: '09:00', end: '18:00' })}
                                className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Adicionar Horário
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-md mb-2 text-gray-800">Horários de Fechamento:</h3>
                            {node.properties.closedTimes.map((time) => (
                                <div key={time.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Ex: Sab-Dom"
                                        value={time.day}
                                        onChange={(e) => handleArrayChange(e, time.id, 'day', 'closedTimes')}
                                        className="w-1/3 rounded-md border-gray-300 p-2"
                                    />
                                    <input
                                        type="time"
                                        value={time.start}
                                        onChange={(e) => handleArrayChange(e, time.id, 'start', 'closedTimes')}
                                        className="w-1/4 rounded-md border-gray-300 p-2"
                                    />
                                    <input
                                        type="time"
                                        value={time.end}
                                        onChange={(e) => handleArrayChange(e, time.id, 'end', 'closedTimes')}
                                        className="w-1/4 rounded-md border-gray-300 p-2"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('closedTimes', time.id)}
                                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('closedTimes', { day: '', start: '00:00', end: '23:59' })}
                                className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Adicionar Horário
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-md mb-2 text-gray-800">Feriados (DD/MM):</h3>
                            {node.properties.holidays.map((date) => (
                                <div key={date.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="DD/MM"
                                        value={date.date}
                                        onChange={(e) => handleArrayChange(e, date.id, 'date', 'holidays')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('holidays', date.id)}
                                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('holidays', { date: '' })}
                                className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Adicionar Feriado
                            </button>
                        </div>
                    </div>
                )}

                {node.type === 'ivr' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Texto de Áudio:</label>
                            <textarea
                                name="audioText"
                                value={node.properties.audioText}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                rows="3"
                            ></textarea>
                        </div>
                        <div>
                            <h3 className="font-semibold text-md mb-2 text-gray-800">Opções DTMF:</h3>
                            {node.properties.dtmfOptions.map((opt) => (
                                <div key={opt.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Tecla (ex: 1)"
                                        value={opt.key}
                                        onChange={(e) => handleArrayChange(e, opt.id, 'key', 'dtmfOptions')}
                                        className="w-1/4 rounded-md border-gray-300 p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rótulo (ex: Vendas)"
                                        value={opt.label}
                                        onChange={(e) => handleArrayChange(e, opt.id, 'label', 'dtmfOptions')}
                                        className="w-1/2 rounded-md border-gray-300 p-2"
                                    />
                                    <select
                                        value={opt.target || ""}
                                        onChange={(e) => handleDTMFTargetChange(e, opt.id)}
                                        className="w-1/2 rounded-md border-gray-300 p-2"
                                    >
                                        <option value="">Sem configuração</option>
                                        {targetNodeOptions.map(n => (
                                            <option key={n.id} value={n.id}>{n.type.toUpperCase()} - {n.id.substring(0, 8)}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeArrayItem('dtmfOptions', opt.id)}
                                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                        -
                                </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('dtmfOptions', { key: '', label: '', target: null })}
                                className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Adicionar Opção DTMF
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Destino Sem Resposta:</label>
                            <select
                                value={node.properties.noResponseTarget || ""}
                                onChange={(e) => handleTargetChange(e, 'noResponseTarget')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                            >
                                <option value="">Sem configuração</option>
                                {targetNodeOptions.map(n => (
                                    <option key={n.id} value={n.id}>{n.type.toUpperCase()} - {n.id.substring(0, 8)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Destino Digitação Incorreta:</label>
                            <select
                                value={node.properties.incorrectInputTarget || ""}
                                onChange={(e) => handleTargetChange(e, 'incorrectInputTarget')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                            >
                                <option value="">Sem configuração</option>
                                {targetNodeOptions.map(n => (
                                    <option key={n.id} value={n.id}>{n.type.toUpperCase()} - {n.id.substring(0, 8)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {node.type === 'agentQueue' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome da Fila:</label>
                            <input
                                type="text"
                                name="name"
                                value={node.properties.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descrição:</label>
                            <textarea
                                name="description"
                                value={node.properties.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                                rows="2"
                            ></textarea>
                        </div>
                        <h3 className="font-semibold text-md mb-2 text-gray-800">Agentes na Fila:</h3>
                        {node.properties.agents.map((agent) => (
                            <div key={agent.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Nome do Agente"
                                    value={agent.name}
                                    onChange={(e) => handleArrayChange(e, agent.id, 'name', 'agents')}
                                    className="w-1/2 rounded-md border-gray-300 p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Ramal"
                                    value={agent.extension}
                                    onChange={(e) => handleArrayChange(e, agent.id, 'extension', 'agents')}
                                    className="w-1/4 rounded-md border-gray-300 p-2"
                                />
                                <button
                                    onClick={() => removeArrayItem('agents', agent.id)}
                                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('agents', { name: '', extension: '' })}
                            className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Adicionar Agente
                        </button>
                    </div>
                )}

                {node.type === 'user' && (
                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Usuário:</label>
                            <input
                                type="text"
                                name="name"
                                value={node.properties.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ramal/Telefone:</label>
                            <input
                                type="text"
                                name="extension"
                                value={node.properties.extension}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // --- Visualização / Exportação do Fluxo ---
    const generateFlowOutput = () => {
        const flowData = {
            clientInfo: {
                clientEmail: clientEmail,
                companyName: companyName
            },
            smtpSettings: smtpSettings, // Inclui as configurações SMTP no JSON exportado
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                x: node.x,
                y: node.y,
                properties: node.properties
            })),
            connections: connections
        };
        return JSON.stringify(flowData, null, 2);
    };

    const handleSendEmail = () => {
        // Esta função é agora um segnaposto poiché l'invio di email è disabilitato nel frontend.
        alert("A função de envio de e-mail está desativada no frontend por motivos de segurança. Para um envio real, um serviço de backend seria necessário.");
    };

    const handleExportFlow = () => {
        const flowJson = generateFlowOutput();
        const blob = new Blob([flowJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ivr_flow.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportFlow = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (importedData.nodes && importedData.connections) {
                        // Assicurati che tutti gli elementi dell'array importati abbiano ID unici
                        const nodesWithIds = importedData.nodes.map(node => {
                            const newNode = { ...node };
                            if (newNode.properties.phoneNumbers) {
                                newNode.properties.phoneNumbers = newNode.properties.phoneNumbers.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            if (newNode.properties.openTimes) {
                                newNode.properties.openTimes = newNode.properties.openTimes.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            if (newNode.properties.closedTimes) {
                                newNode.properties.closedTimes = newNode.properties.closedTimes.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            if (newNode.properties.holidays) {
                                newNode.properties.holidays = newNode.properties.holidays.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            if (newNode.properties.dtmfOptions) {
                                newNode.properties.dtmfOptions = newNode.properties.dtmfOptions.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            // Assicurati che também o array de agentes obtenha IDs únicos na importação
                            if (newNode.properties.agents) {
                                newNode.properties.agents = newNode.properties.agents.map(item => item.id ? item : { id: generateId(), ...item });
                            }
                            return newNode;
                        });

                        setNodes(nodesWithIds);
                        setConnections(importedData.connections);
                        // Carregar informações do cliente se disponíveis
                        if (importedData.clientInfo) {
                            setClientEmail(importedData.clientInfo.clientEmail || '');
                            setCompanyName(importedData.clientInfo.companyName || '');
                        }
                        // Carregar configurações SMTP se disponíveis
                        if (importedData.smtpSettings) {
                            setSmtpSettings(importedData.smtpSettings);
                        }
                        setSelectedNodeId(null); // Limpar nó selecionado após importação
                        alert('Fluxo importado com sucesso!');
                    } else {
                        alert('Formato de arquivo JSON inválido para o fluxo IVR.');
                    }
                } catch (error) {
                    alert('Erro ao ler o arquivo JSON: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };

    // Função para redefinir todos os estados para seus valores iniciais
    const handleClearAll = useCallback(() => {
        setNodes([]);
        setConnections([]);
        setSelectedNodeId(null);
        setClientEmail('');
        setCompanyName('');
        setSmtpSettings({
            host: 'smtp.yourcompany.com',
            port: 587,
            secure: false,
            user: 'your_email@yourcompany.com',
            pass: 'your_email_password'
        });
        setIsHardcoded(false);
        setRecipientEmail('');
        setEmailMessage('');
        setFormSubmitted(false);
        setPanOffset({ x: 0, y: 0 });
        setZoomLevel(1);
        setIsDraggingCanvas(false);
        setStartPanPoint({ x: 0, y: 0 });
        setDraggingNodeId(null);
        setDragOffset({ x: 0, y: 0 });
        // Garantir que o canvas seja redesenhado após a limpeza
        draw();
    }, [setNodes, setConnections, setSelectedNodeId, setClientEmail, setCompanyName, setSmtpSettings, setIsHardcoded, setRecipientEmail, setEmailMessage, setFormSubmitted, setPanOffset, setZoomLevel, setIsDraggingCanvas, setStartPanPoint, setDraggingNodeId, setDragOffset, draw]);


    return (
        <div className="flex h-screen bg-gray-100 font-inter">
            {/* Barra Lateral / Paleta de Nós */}
            <div className="w-64 bg-gray-800 text-white p-4 flex flex-col shadow-lg rounded-r-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Nós IVR</h2>

                {/* Campos de Email do Contato e Nome do Projeto */}
                <div className="mb-4 space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Email do Contato: <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className={`w-full p-2 rounded-md bg-gray-700 text-white border ${
                            formSubmitted && !clientEmail ? 'border-red-500' : 'border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="seu.email@exemplo.com"
                    />
                    <label className="block text-sm font-medium text-gray-300">
                        Nome do Projeto: <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={`w-full p-2 rounded-md bg-gray-700 text-white border ${
                            formSubmitted && !companyName ? 'border-red-500' : 'border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Nome do Projeto"
                    />
                </div>

                {/* Separador Visual */}
                <hr className="border-t-2 border-gray-600 my-4" />

                {/* Campos de Envio de Email */}
                <div className="mb-4 space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Email do Destinatário: <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="destinatario@exemplo.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className={`w-full p-2 rounded-md bg-gray-700 text-white border ${
                            formSubmitted && !recipientEmail ? 'border-red-500' : 'border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                        onClick={handleSendEmail}
                        className={`w-full p-3 rounded-md shadow-md transition duration-200 ease-in-out ${
                            clientEmail && companyName && recipientEmail ? 'bg-green-600 hover:bg-green-700 transform hover:scale-105' : 'bg-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!clientEmail || !companyName || !recipientEmail} // Desabilitado com base nos campos obrigatórios
                    >
                        Enviar Fluxo por Email (Desabilitado)
                    </button>
                    {emailMessage && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 text-sm rounded-md mt-2" role="alert">
                            <p className="font-bold">Aviso:</p>
                            <pre className="text-xs overflow-auto whitespace-pre-wrap">{emailMessage}</pre>
                        </div>
                    )}
                </div>

                {/* Separador Visual */}
                <hr className="border-t-2 border-gray-600 my-4" />

                <div className="space-y-4 flex-grow">
                    <button
                        onClick={() => addNode('start', 50, 50)} // Passa coordenadas fixas do mundo
                        className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Início
                    </button>
                    <button
                        onClick={() => addNode('calendar', 50, 150)} // Passa coordenadas fixas do mundo
                        className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Calendário
                    </button>
                    <button
                        onClick={() => addNode('ivr', 50, 250)} // Passa coordenadas fixas do mundo
                        className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        IVR
                    </button>
                    <button
                        onClick={() => addNode('agentQueue', 50, 350)} // Passa coordenadas fixas do mundo
                        className="w-full p-3 bg-orange-600 hover:bg-orange-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Fila de Agente
                    </button>
                    <button
                        onClick={() => addNode('user', 50, 450)} // Passa coordenadas fixas do mundo
                        className="w-full p-3 bg-teal-600 hover:bg-teal-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Usuário
                    </button>
                </div>
                <button
                    onClick={handleExportFlow}
                    className="mt-6 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Exportar Fluxo
                </button>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFlow}
                    className="hidden"
                    id="import-file-input"
                />
                <label
                    htmlFor="import-file-input"
                    className="mt-2 w-full p-3 bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 text-center cursor-pointer"
                >
                    Importar Fluxo
                </label>
                <button
                    onClick={() => setShowEmailConfigModal(true)}
                    className="mt-2 p-3 bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Configurações de Email
                </button>
                <button
                    onClick={handleClearAll}
                    className="mt-2 p-3 bg-red-600 hover:bg-red-700 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Limpar Tudo
                </button>
            </div>

            {/* Área Principal do Canvas */}
            <div
                ref={containerRef}
                className="flex-grow relative bg-gray-200 overflow-auto rounded-l-lg"
                onMouseDown={handleCanvasMouseDown} // Gerencia o início do pan do canvas
            >
                <div
                    ref={contentRef}
                    style={{
                        position: 'relative',
                        width: `${WORKSPACE_INITIAL_SIZE}px`, // Tamanho fixo grande
                        height: `${WORKSPACE_INITIAL_SIZE}px`, // Tamanho fixo grande
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`, // Usar a versão do estado
                        transformOrigin: '0 0',
                        backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)`,
                        backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`, // Escala a grade com o zoom
                        backgroundPosition: `${panOffset.x}px ${panOffset.y}px` // Move a grade com o pan
                    }}
                >
                    <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
                    <div className="relative z-10">
                        {nodes.map(renderNode)}
                    </div>
                </div>
            </div>

            {/* Painel de Propriedades */}
            <PropertyPanel
                node={nodes.find(n => n.id === selectedNodeId)} // Passa o objeto do nó mais recente
                onUpdate={updateNodeProperties}
                onClose={() => setSelectedNodeId(null)} // Define o ID como nulo
                generateId={generateId}
                nodes={nodes}
            />

            {/* Modal de Configuração de Email (Removido, pois a funcionalidade está desabilitada) */}
            {/* {showEmailConfigModal && (
                <EmailConfigModal
                    clientEmail={clientEmail}
                    setClientEmail={setClientEmail}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    smtpSettings={smtpSettings}
                    setSmtpSettings={setSmtpSettings}
                    isHardcoded={isHardcoded}
                    setIsHardcoded={setIsHardcoded}
                    onClose={() => setShowEmailConfigModal(false)}
                />
            )} */}
        </div>
    );
};

export default App;


