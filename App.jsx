{
  "clientInfo": {
    "clientEmail": "",
    "companyName": ""
  },
  "smtpSettings": {
    "host": "smtp.yourcompany.com",
    "port": 587,
    "secure": false,
    "user": "your_email@yourcompany.com",
    "pass": "your_email_password"
  },
  "nodes": [
    {
      "id": "node-1751885318299-akor56nbs",
      "type": "agentQueue",
      "x": 50,
      "y": 350,
      "properties": {
        "name": "Fila de Vendas",
        "description": "Atendimento comercial",
        "agents": [
          {
            "id": "node-1751885318299-0d7dke573",
            "name": "Agente 1",
            "extension": ""
          },
          {
            "id": "node-1751885320078-8svsas6j1",
            "name": "",
            "extension": ""
          },
          {
            "id": "node-1751885320754-nmaoum51d",
            "name": "",
            "extension": ""
          },
          {
            "id": "node-1751885321234-4fnmoguar",
            "name": "",
            "extension": ""
          }
        ]
      }
    },
    {
      "id": "node-1751885322404-j3a79rske",
      "type": "start",
      "x": 50,
      "y": 50,
      "properties": {
        "phoneNumbers": [
          {
            "id": "node-1751885322404-pseviw51h",
            "value": "+55 (XX) XXXXX-XXXX"
          }
        ]
      }
    },
    {
      "id": "node-1751885323784-960lb9dz8",
      "type": "user",
      "x": 50,
      "y": 450,
      "properties": {
        "name": "João Silva",
        "extension": "1234"
      }
    },
    {
      "id": "node-1751885324835-bnwnmdkk3",
      "type": "agentQueue",
      "x": 302,
      "y": 356,
      "properties": {
        "name": "Fila de Vendas",
        "description": "Atendimento comercial",
        "agents": [
          {
            "id": "node-1751885324835-2i5qsgcrw",
            "name": "Agente 1",
            "extension": ""
          }
        ]
      }
    },
    {
      "id": "node-1751885328299-9mw92negj",
      "type": "calendar",
      "x": 321,
      "y": 190,
      "properties": {
        "openTimes": [
          {
            "id": "node-1751885328299-j6f96nhry",
            "day": "Seg-Sex",
            "start": "09:00",
            "end": "18:00"
          }
        ],
        "closedTimes": [
          {
            "id": "node-1751885328299-k27jxclxp",
            "day": "Sab-Dom",
            "start": "00:00",
            "end": "23:59"
          }
        ],
        "holidays": [
          {
            "id": "node-1751885328299-2n7t73b7o",
            "date": "01/01"
          }
        ]
      }
    }
  ],
  "connections": [
    {
      "fromNodeId": "node-1751885322404-j3a79rske",
      "fromOutputId": "output",
      "toNodeId": "node-1751885328299-9mw92negj"
    },
    {
      "fromNodeId": "node-1751885328299-9mw92negj",
      "fromOutputId": "holiday",
      "toNodeId": "node-1751885318299-akor56nbs"
    },
    {
      "fromNodeId": "node-1751885328299-9mw92negj",
      "fromOutputId": "closed",
      "toNodeId": "node-1751885324835-bnwnmdkk3"
    },
    {
      "fromNodeId": "node-1751885328299-9mw92negj",
      "fromOutputId": "open",
      "toNodeId": "node-1751885323784-960lb9dz8"
    }
  ]
}
