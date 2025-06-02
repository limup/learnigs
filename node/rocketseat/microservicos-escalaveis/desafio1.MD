# 📋 Documentação de Problema de Negócio

## **Cenário: Plataforma de Streaming de Vídeo**

---

## 🎯 **Visão Geral do Negócio**

A **StreamFlix** é uma plataforma de streaming de vídeo que oferece filmes, séries e documentários sob demanda. Com o crescimento exponencial de usuários, a arquitetura monolítica atual não consegue mais suportar:

- **5 milhões+ usuários ativos mensais**
- **500.000+ streams simultâneos**
- **Upload de 1.000+ horas de conteúdo diariamente**
- **Recomendações personalizadas em tempo real**
- **Múltiplas qualidades de vídeo (4K, HD, SD)**

---

## 🔄 **Fluxo de Negócio Principal**

### **Jornada do Usuário:**
1. **Autenticação** → Login/cadastro na plataforma
2. **Descoberta** → Navega pelo catálogo e recebe recomendações
3. **Seleção** → Escolhe conteúdo para assistir
4. **Streaming** → Reproduz vídeo com qualidade adaptativa
5. **Interação** → Pausa, retoma, avalia, adiciona à lista
6. **Histórico** → Sistema registra progresso de visualização
7. **Recomendação** → Algoritmo atualiza sugestões baseado no comportamento

### **Jornada do Criador de Conteúdo:**
1. **Upload** → Envia arquivo de vídeo original
2. **Processamento** → Sistema converte para múltiplos formatos
3. **Moderação** → Conteúdo passa por análise automática/manual
4. **Publicação** → Vídeo fica disponível no catálogo
5. **Analytics** → Criador acompanha métricas de visualização

---

## 📊 **Domínios de Negócio Identificados**

| Domínio | Responsabilidades | Dados Principais |
|---------|------------------|------------------|
| **Usuários** | Autenticação, perfis, preferências | Credenciais, perfis, assinaturas |
| **Catálogo** | Metadados de conteúdo, categorização | Títulos, gêneros, sinopses, elenco |
| **Streaming** | Reprodução de vídeo, qualidade adaptativa | URLs de stream, bitrates, legendas |
| **Processamento** | Encoding, transcodificação, thumbnails | Jobs de conversão, formatos, status |
| **Visualização** | Histórico, progresso, estatísticas | Tempo assistido, dispositivos, localização |
| **Recomendação** | Algoritmos de ML, personalização | Ratings, comportamento, similaridades |
| **Moderação** | Análise de conteúdo, compliance | Flags de conteúdo, relatórios, aprovações |
| **Analytics** | Métricas de negócio, relatórios | KPIs, dashboards, dados agregados |

---

## ⚡ **Eventos de Negócio Críticos**

### **Eventos que Impactam Múltiplos Domínios:**

#### 🎬 **Vídeo Carregado**
- **Quando:** Criador faz upload de novo conteúdo
- **Impacto:** Inicia processamento, cria entrada no catálogo, agenda moderação
- **Dados:** ID do vídeo, metadados, arquivo original, criador

#### ▶️ **Stream Iniciado**
- **Quando:** Usuário começa a assistir conteúdo
- **Impacto:** Registra visualização, atualiza analytics, influencia recomendações
- **Dados:** ID do usuário, ID do conteúdo, dispositivo, qualidade, timestamp

#### ⏸️ **Progresso de Visualização**
- **Quando:** Usuário pausa, retoma ou termina de assistir
- **Impacto:** Salva ponto de parada, atualiza histórico, gera dados para ML
- **Dados:** Posição no vídeo, duração assistida, ação (pause/play/stop)

#### 🔄 **Processamento Concluído**
- **Quando:** Vídeo termina encoding em todas as qualidades
- **Impacto:** Disponibiliza para streaming, notifica criador, indexa para busca
- **Dados:** ID do vídeo, formatos gerados, URLs de CDN, thumbnails

#### ⭐ **Conteúdo Avaliado**
- **Quando:** Usuário dá nota ou feedback
- **Impacto:** Atualiza algoritmo de recomendação, métricas de qualidade
- **Dados:** Rating, comentário, ID do usuário, ID do conteúdo

#### 🚫 **Conteúdo Moderado**
- **Quando:** Sistema ou moderador aprova/rejeita conteúdo
- **Impacto:** Publica ou remove do catálogo, notifica criador
- **Dados:** Status da moderação, motivo, moderador, timestamp

---

## 🎯 **Requisitos Não-Funcionais**

### **Escalabilidade:**
- Streaming: Milhões de conexões simultâneas
- Processamento: Paralelização massiva de encoding
- Recomendações: Cálculos em tempo real para milhões de usuários

### **Performance:**
- Streaming: Latência <100ms para início de reprodução
- Busca: Resultados em <200ms
- Recomendações: Atualizações em <500ms

### **Disponibilidade:**
- Streaming: 99.99% (core business)
- Catálogo: 99.9% (impacta descoberta)
- Analytics: 99% (não crítico para usuário final)

### **Armazenamento:**
- Vídeos: Petabytes distribuídos globalmente
- Metadados: Milhões de registros com busca rápida
- Analytics: Bilhões de eventos de telemetria

---

## 🔍 **Pontos de Integração Externa**

| Sistema | Tipo | Frequência | Dados |
|---------|------|------------|-------|
| **CDN Global** | API REST | Contínua | URLs de vídeo, cache, geolocalização |
| **Serviços de ML** | API/Streaming | Tempo real | Dados comportamentais, features |
| **Pagamentos** | API REST | Por assinatura | Dados de cobrança, status de pagamento |
| **Redes Sociais** | API REST | Por compartilhamento | Metadados de conteúdo, links |
| **Sistemas de DRM** | API/SDK | Por stream | Licenças, proteção de conteúdo |
| **Analytics Externos** | Webhook | Batch diário | Métricas agregadas, relatórios |

---

## 📱 **Contextos de Uso**

### **Dispositivos Múltiplos:**
- Smart TVs, smartphones, tablets, browsers
- Sincronização de progresso entre dispositivos
- Qualidade adaptativa por capacidade do dispositivo

### **Cenários de Rede:**
- Streaming adaptativo para conexões lentas
- Download offline para visualização sem internet
- Otimização para redes móveis vs WiFi

### **Personalização:**
- Perfis familiares (adulto, infantil)
- Recomendações por gênero, horário, dispositivo
- Controles parentais e restrições de conteúdo

---

## 📋 **Desafio para o Aluno**

Com base nesta documentação, você deve:

### ✅ **Parte 1: Identificação de Microsserviços**
- Identifique **pelo menos 2 microsserviços** baseados nos domínios
- Considere:
  - Diferentes padrões de acesso (leitura vs escrita)
  - Requisitos de escalabilidade distintos
  - Ciclos de vida independentes dos dados

### ✅ **Parte 2: Eventos de Comunicação**
- Mapeie **eventos assíncronos** críticos para o negócio
- Defina **contratos de mensagem** com schemas detalhados
- Identifique **padrões de eventual consistency**

### ✅ **Parte 3: Documentação no EventCatalog**
- Configure eventos no EventCatalog
- Documente **produtores e consumidores**
- Inclua **exemplos de payload** realistas

### ✅ **Parte 4: Diagrama Visual**
- Crie diagrama mostrando:
  - Fluxo de dados entre microsserviços
  - Eventos de alta frequência vs baixa frequência
  - Pontos de integração com sistemas externos
  - Estratégias de cache e CDN

---

## 💡 **Dicas para Análise**

1. **Observe volumes de dados** → Alguns domínios processam muito mais dados
2. **Identifique operações custosas** → Processamento de vídeo vs metadados
3. **Analise padrões temporais** → Picos de uso em horários específicos
4. **Considere latência** → Streaming precisa ser mais rápido que analytics
5. **Pense em falhas** → O que acontece se o processamento falhar?

---

Este cenário oferece complexidades interessantes como processamento assíncrono pesado, eventos de alta frequência, e diferentes requisitos de performance entre domínios, proporcionando uma excelente base para discussão sobre arquitetura de microsserviços.