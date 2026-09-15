import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  await prisma.companyRelation.deleteMany()
  await prisma.companyCategory.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.company.deleteMany()

  console.log('✓ Cleared existing data')

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Large Language Models',
        slug: 'large-language-models',
        description: 'Companies building and training large language models',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Computer Vision',
        slug: 'computer-vision',
        description: 'AI for image and video analysis',
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI Infrastructure',
        slug: 'ai-infrastructure',
        description: 'Tools and platforms for building AI applications',
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI Research',
        slug: 'ai-research',
        description: 'Research organizations advancing AI',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Generative AI',
        slug: 'generative-ai',
        description: 'AI systems that create content',
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI Safety',
        slug: 'ai-safety',
        description: 'Organizations focused on safe AI development',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Enterprise AI',
        slug: 'enterprise-ai',
        description: 'AI solutions for businesses',
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI Agents',
        slug: 'ai-agents',
        description: 'Autonomous AI systems and assistants',
      },
    }),
  ])

  console.log('✓ Created categories')

  const companies = await Promise.all([

    prisma.company.create({
      data: {
        name: 'OpenAI',
        slug: 'openai',
        shortDescription: 'Leading AI research and deployment company',
        description: 'OpenAI is an AI research and deployment company dedicated to ensuring that artificial general intelligence benefits all of humanity. Known for GPT models and ChatGPT.',
        logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        website: 'https://openai.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2015,
        industry: 'Artificial Intelligence',
        companyType: 'RESEARCH',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'Anthropic',
        slug: 'anthropic',
        shortDescription: 'AI safety and research company building reliable, interpretable AI systems',
        description: 'Anthropic is an AI safety startup focused on building reliable, interpretable, and steerable AI systems. The company develops Claude, a next-generation AI assistant.',
        logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        website: 'https://anthropic.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2021,
        industry: 'AI Safety',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'Google DeepMind',
        slug: 'google-deepmind',
        shortDescription: 'AI research lab working on artificial general intelligence',
        description: 'Google DeepMind is a world-leading artificial intelligence research laboratory. Known for breakthrough achievements in AI including AlphaGo, AlphaFold, and Gemini.',
        logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400',
        website: 'https://deepmind.google',
        headquarters: 'London, UK',
        foundedYear: 2010,
        industry: 'AI Research',
        companyType: 'ENTERPRISE',
        employeeRange: 'ENTERPRISE_501_PLUS',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'Mistral AI',
        slug: 'mistral-ai',
        shortDescription: 'European AI company building open and efficient language models',
        description: 'Mistral AI is a French company specializing in open-source large language models. They focus on efficiency and making AI accessible through open models.',
        logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        website: 'https://mistral.ai',
        headquarters: 'Paris, France',
        foundedYear: 2023,
        industry: 'Large Language Models',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Cohere
    prisma.company.create({
      data: {
        name: 'Cohere',
        slug: 'cohere',
        shortDescription: 'Enterprise AI platform for text generation and understanding',
        description: 'Cohere provides access to advanced Large Language Models and NLP tools through one easy-to-use API. Built for enterprise applications.',
        logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        website: 'https://cohere.com',
        headquarters: 'Toronto, Canada',
        foundedYear: 2019,
        industry: 'Natural Language Processing',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Hugging Face
    prisma.company.create({
      data: {
        name: 'Hugging Face',
        slug: 'hugging-face',
        shortDescription: 'AI community and platform for machine learning models',
        description: 'Hugging Face is the collaboration platform for the machine learning community. Host models, datasets, and build ML applications.',
        logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400',
        website: 'https://huggingface.co',
        headquarters: 'New York, NY',
        foundedYear: 2016,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // Stability AI
    prisma.company.create({
      data: {
        name: 'Stability AI',
        slug: 'stability-ai',
        shortDescription: 'Open-source generative AI company behind Stable Diffusion',
        description: 'Stability AI is building open AI tools to activate humanity\'s potential. Best known for Stable Diffusion, an open-source text-to-image model.',
        logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        website: 'https://stability.ai',
        headquarters: 'London, UK',
        foundedYear: 2020,
        industry: 'Generative AI',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Midjourney
    prisma.company.create({
      data: {
        name: 'Midjourney',
        slug: 'midjourney',
        shortDescription: 'AI art generator creating stunning images from text',
        description: 'Midjourney is an independent research lab producing an AI program that creates images from textual descriptions. Known for high-quality artistic outputs.',
        logo: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400',
        website: 'https://midjourney.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2021,
        industry: 'Generative AI',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Replicate
    prisma.company.create({
      data: {
        name: 'Replicate',
        slug: 'replicate',
        shortDescription: 'Platform for running machine learning models in the cloud',
        description: 'Replicate makes it easy to run machine learning models with a cloud API. Run open-source models or deploy your own.',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        website: 'https://replicate.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2019,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Scale AI
    prisma.company.create({
      data: {
        name: 'Scale AI',
        slug: 'scale-ai',
        shortDescription: 'Data platform for AI with human-in-the-loop',
        description: 'Scale AI provides high-quality training data for AI applications. Their platform powers the most ambitious AI projects.',
        logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        website: 'https://scale.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2016,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // Runway
    prisma.company.create({
      data: {
        name: 'Runway',
        slug: 'runway',
        shortDescription: 'AI-powered creative tools for video and image generation',
        description: 'Runway is pioneering new tools for human expression. Their AI magic tools enable new forms of creativity in video, image, and text.',
        logo: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
        website: 'https://runwayml.com',
        headquarters: 'New York, NY',
        foundedYear: 2018,
        industry: 'Generative AI',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Character.AI
    prisma.company.create({
      data: {
        name: 'Character.AI',
        slug: 'character-ai',
        shortDescription: 'Platform for creating and chatting with AI characters',
        description: 'Character.AI lets you create and talk to advanced AI characters. Use it for imagination, brainstorming, learning, and more.',
        logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400',
        website: 'https://character.ai',
        headquarters: 'Menlo Park, CA',
        foundedYear: 2021,
        industry: 'AI Agents',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Perplexity AI
    prisma.company.create({
      data: {
        name: 'Perplexity AI',
        slug: 'perplexity-ai',
        shortDescription: 'AI-powered answer engine for research and discovery',
        description: 'Perplexity AI is an AI-powered search engine and chatbot that provides accurate answers with citations. Built for research and discovery.',
        logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
        website: 'https://perplexity.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'AI Search',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Adept
    prisma.company.create({
      data: {
        name: 'Adept',
        slug: 'adept',
        shortDescription: 'Building AI that works with people to solve complex problems',
        description: 'Adept is training AI to use software tools and APIs to accomplish tasks. Their mission is to build general intelligence that enables humans and computers to work together.',
        logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
        website: 'https://adept.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'AI Agents',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Inflection AI
    prisma.company.create({
      data: {
        name: 'Inflection AI',
        slug: 'inflection-ai',
        shortDescription: 'Personal AI company creating Pi, your personal assistant',
        description: 'Inflection AI is building personal AI that helps people express themselves and get things done. Their first product is Pi, a personal intelligence.',
        logo: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400',
        website: 'https://inflection.ai',
        headquarters: 'Palo Alto, CA',
        foundedYear: 2022,
        industry: 'AI Agents',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACQUIRED',
      },
    }),
    // Synthesia
    prisma.company.create({
      data: {
        name: 'Synthesia',
        slug: 'synthesia',
        shortDescription: 'AI video generation platform with virtual avatars',
        description: 'Synthesia enables you to create professional videos in 120 languages without equipment or actors. AI-powered video creation at scale.',
        logo: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400',
        website: 'https://synthesia.io',
        headquarters: 'London, UK',
        foundedYear: 2017,
        industry: 'Video Generation',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // ElevenLabs
    prisma.company.create({
      data: {
        name: 'ElevenLabs',
        slug: 'elevenlabs',
        shortDescription: 'AI voice generation and text-to-speech platform',
        description: 'ElevenLabs creates the most realistic, versatile and contextually aware AI audio. Their text-to-speech and voice cloning technology is industry-leading.',
        logo: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400',
        website: 'https://elevenlabs.io',
        headquarters: 'New York, NY',
        foundedYear: 2022,
        industry: 'Audio AI',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Together AI
    prisma.company.create({
      data: {
        name: 'Together AI',
        slug: 'together-ai',
        shortDescription: 'Cloud platform for running and fine-tuning open-source AI models',
        description: 'Together AI makes it easy to run, fine-tune, and deploy open-source AI models. Fast inference and training on the best hardware.',
        logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        website: 'https://together.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Weights & Biases
    prisma.company.create({
      data: {
        name: 'Weights & Biases',
        slug: 'weights-and-biases',
        shortDescription: 'MLOps platform for experiment tracking and model management',
        description: 'Weights & Biases is the AI developer platform. Build better models faster with experiment tracking, dataset versioning, and model management.',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        website: 'https://wandb.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2017,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // AI21 Labs
    prisma.company.create({
      data: {
        name: 'AI21 Labs',
        slug: 'ai21-labs',
        shortDescription: 'AI lab building foundation models for language understanding',
        description: 'AI21 Labs builds foundation models and AI systems for enterprise applications. Their Jurassic models power business solutions worldwide.',
        logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        website: 'https://ai21.com',
        headquarters: 'Tel Aviv, Israel',
        foundedYear: 2017,
        industry: 'Large Language Models',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Jasper AI
    prisma.company.create({
      data: {
        name: 'Jasper',
        slug: 'jasper',
        shortDescription: 'AI copilot for marketing teams',
        description: 'Jasper is the AI copilot for marketing teams. Create content faster, optimize campaigns, and work more efficiently with AI assistance.',
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
        website: 'https://jasper.ai',
        headquarters: 'Austin, TX',
        foundedYear: 2021,
        industry: 'Marketing AI',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // Notion AI
    prisma.company.create({
      data: {
        name: 'Notion',
        slug: 'notion',
        shortDescription: 'All-in-one workspace with AI capabilities',
        description: 'Notion is the connected workspace where better, faster work happens. Now enhanced with AI to help you write, think, and do more.',
        logo: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
        website: 'https://notion.so',
        headquarters: 'San Francisco, CA',
        foundedYear: 2016,
        industry: 'Productivity AI',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // Grammarly
    prisma.company.create({
      data: {
        name: 'Grammarly',
        slug: 'grammarly',
        shortDescription: 'AI-powered writing assistance platform',
        description: 'Grammarly uses AI to help people communicate more effectively. From grammar checking to tone suggestions, Grammarly improves your writing.',
        logo: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
        website: 'https://grammarly.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2009,
        industry: 'Writing AI',
        companyType: 'ENTERPRISE',
        employeeRange: 'ENTERPRISE_501_PLUS',
        status: 'ACTIVE',
      },
    }),
    // Copy.ai
    prisma.company.create({
      data: {
        name: 'Copy.ai',
        slug: 'copy-ai',
        shortDescription: 'AI content generator for marketing copy',
        description: 'Copy.ai is an AI-powered copywriter that generates high-quality copy for your business. Create blog posts, social media content, and more.',
        logo: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400',
        website: 'https://copy.ai',
        headquarters: 'Memphis, TN',
        foundedYear: 2020,
        industry: 'Marketing AI',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Writesonic
    prisma.company.create({
      data: {
        name: 'Writesonic',
        slug: 'writesonic',
        shortDescription: 'AI writer for creating SEO-optimized content',
        description: 'Writesonic is an AI writer that creates SEO-friendly content for blogs, ads, emails, and websites. Generate content 10x faster.',
        logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400',
        website: 'https://writesonic.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2020,
        industry: 'Content AI',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Harvey AI
    prisma.company.create({
      data: {
        name: 'Harvey',
        slug: 'harvey',
        shortDescription: 'Generative AI for elite law firms',
        description: 'Harvey is a generative AI platform built specifically for legal professionals. Trusted by the world\'s leading law firms for research and drafting.',
        logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
        website: 'https://harvey.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'Legal AI',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Glean
    prisma.company.create({
      data: {
        name: 'Glean',
        slug: 'glean',
        shortDescription: 'AI-powered workplace search and knowledge management',
        description: 'Glean brings all your company\'s knowledge together in one place, powered by AI. Find information instantly across all your tools.',
        logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        website: 'https://glean.com',
        headquarters: 'Palo Alto, CA',
        foundedYear: 2019,
        industry: 'Enterprise AI',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Cursor
    prisma.company.create({
      data: {
        name: 'Cursor',
        slug: 'cursor',
        shortDescription: 'AI-first code editor built for productivity',
        description: 'Cursor is the AI-first code editor designed for pair-programming with AI. Write code faster with AI assistance built into your editor.',
        logo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
        website: 'https://cursor.sh',
        headquarters: 'San Francisco, CA',
        foundedYear: 2023,
        industry: 'Developer Tools',
        companyType: 'STARTUP',
        employeeRange: 'SOLO_1',
        status: 'ACTIVE',
      },
    }),
    // GitHub Copilot
    prisma.company.create({
      data: {
        name: 'GitHub',
        slug: 'github',
        shortDescription: 'AI pair programmer integrated into your IDE',
        description: 'GitHub offers Copilot, an AI pair programmer that helps you write code faster. Powered by OpenAI Codex, integrated into popular IDEs.',
        logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400',
        website: 'https://github.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2008,
        industry: 'Developer Tools',
        companyType: 'ENTERPRISE',
        employeeRange: 'ENTERPRISE_501_PLUS',
        status: 'ACTIVE',
      },
    }),
    // Replit
    prisma.company.create({
      data: {
        name: 'Replit',
        slug: 'replit',
        shortDescription: 'Collaborative browser-based IDE with AI coding assistance',
        description: 'Replit is a collaborative browser-based IDE with AI-powered coding assistance. Build software faster with Ghostwriter AI.',
        logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
        website: 'https://replit.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2016,
        industry: 'Developer Tools',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Tabnine
    prisma.company.create({
      data: {
        name: 'Tabnine',
        slug: 'tabnine',
        shortDescription: 'AI code completion for developers',
        description: 'Tabnine is an AI assistant that speeds up delivery and keeps your code safe. Get whole-line and full-function code completions.',
        logo: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400',
        website: 'https://tabnine.com',
        headquarters: 'Tel Aviv, Israel',
        foundedYear: 2012,
        industry: 'Developer Tools',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Mendable
    prisma.company.create({
      data: {
        name: 'Mendable',
        slug: 'mendable',
        shortDescription: 'AI-powered search and chat for documentation',
        description: 'Mendable builds AI-powered search and chat components for documentation. Help users find answers faster with AI.',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        website: 'https://mendable.ai',
        headquarters: 'San Francisco, CA',
        foundedYear: 2023,
        industry: 'Developer Tools',
        companyType: 'STARTUP',
        employeeRange: 'SOLO_1',
        status: 'ACTIVE',
      },
    }),
    // Vercel AI
    prisma.company.create({
      data: {
        name: 'Vercel',
        slug: 'vercel',
        shortDescription: 'Frontend cloud platform with AI SDK',
        description: 'Vercel is the platform for frontend developers. Now with the AI SDK for building AI-powered applications with React, Next.js, and more.',
        logo: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400',
        website: 'https://vercel.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2015,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // LangChain
    prisma.company.create({
      data: {
        name: 'LangChain',
        slug: 'langchain',
        shortDescription: 'Framework for developing LLM-powered applications',
        description: 'LangChain is a framework for developing applications powered by language models. Build context-aware, reasoning applications.',
        logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
        website: 'https://langchain.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Pinecone
    prisma.company.create({
      data: {
        name: 'Pinecone',
        slug: 'pinecone',
        shortDescription: 'Vector database for AI applications',
        description: 'Pinecone is a fully managed vector database that makes it easy to add vector search to production applications. Purpose-built for AI.',
        logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        website: 'https://pinecone.io',
        headquarters: 'San Francisco, CA',
        foundedYear: 2019,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Weaviate
    prisma.company.create({
      data: {
        name: 'Weaviate',
        slug: 'weaviate',
        shortDescription: 'Open-source vector database for AI applications',
        description: 'Weaviate is an open-source vector database that stores both objects and vectors. Build AI-native applications with semantic search.',
        logo: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400',
        website: 'https://weaviate.io',
        headquarters: 'Amsterdam, Netherlands',
        foundedYear: 2019,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Chroma
    prisma.company.create({
      data: {
        name: 'Chroma',
        slug: 'chroma',
        shortDescription: 'Open-source embedding database for LLM applications',
        description: 'Chroma is the open-source embedding database. Build AI applications with the simplest way to store and search embeddings.',
        logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
        website: 'https://trychroma.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2022,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SOLO_1',
        status: 'ACTIVE',
      },
    }),
    // Qdrant
    prisma.company.create({
      data: {
        name: 'Qdrant',
        slug: 'qdrant',
        shortDescription: 'Vector similarity search engine',
        description: 'Qdrant is a vector similarity search engine with extended filtering support. Built for production-ready AI applications.',
        logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
        website: 'https://qdrant.tech',
        headquarters: 'Berlin, Germany',
        foundedYear: 2021,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Modal
    prisma.company.create({
      data: {
        name: 'Modal',
        slug: 'modal',
        shortDescription: 'Serverless cloud platform for data and ML workloads',
        description: 'Modal is the cloud platform for developers. Run generative AI models, large-scale batch jobs, and more. No infrastructure required.',
        logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        website: 'https://modal.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2021,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'Anyscale',
        slug: 'anyscale',
        shortDescription: 'Platform for developing and deploying AI applications at scale',
        description: 'Anyscale is the company behind Ray, the open-source framework for scaling AI and Python applications. Deploy AI at any scale.',
        logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        website: 'https://anyscale.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2019,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'OctoML',
        slug: 'octoml',
        shortDescription: 'ML acceleration platform for efficient AI deployment',
        description: 'OctoML makes it easy to deploy machine learning models efficiently. Accelerate your ML and reduce costs with automated optimization.',
        logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
        website: 'https://octoml.ai',
        headquarters: 'Seattle, WA',
        foundedYear: 2019,
        industry: 'AI Infrastructure',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'AssemblyAI',
        slug: 'assemblyai',
        shortDescription: 'AI models for speech-to-text and audio understanding',
        description: 'AssemblyAI builds AI models to transcribe and understand speech. State-of-the-art AI for audio data.',
        logo: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400',
        website: 'https://assemblyai.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2017,
        industry: 'Audio AI',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),

    prisma.company.create({
      data: {
        name: 'Deepgram',
        slug: 'deepgram',
        shortDescription: 'Speech recognition and understanding API',
        description: 'Deepgram provides fast, accurate speech-to-text with advanced AI models. Built for developers, scaled for enterprises.',
        logo: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
        website: 'https://deepgram.com',
        headquarters: 'San Francisco, CA',
        foundedYear: 2015,
        industry: 'Audio AI',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Roboflow
    prisma.company.create({
      data: {
        name: 'Roboflow',
        slug: 'roboflow',
        shortDescription: 'Computer vision platform for building vision AI',
        description: 'Roboflow makes it easy to build and deploy computer vision models. From dataset creation to production deployment.',
        logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
        website: 'https://roboflow.com',
        headquarters: 'Des Moines, IA',
        foundedYear: 2019,
        industry: 'Computer Vision',
        companyType: 'STARTUP',
        employeeRange: 'SMALL_2_10',
        status: 'ACTIVE',
      },
    }),
    // Landing AI
    prisma.company.create({
      data: {
        name: 'Landing AI',
        slug: 'landing-ai',
        shortDescription: 'Computer vision platform for manufacturing and industry',
        description: 'Landing AI provides an end-to-end computer vision platform for manufacturing. Founded by Andrew Ng to bring AI to industry.',
        logo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        website: 'https://landing.ai',
        headquarters: 'Palo Alto, CA',
        foundedYear: 2017,
        industry: 'Computer Vision',
        companyType: 'STARTUP',
        employeeRange: 'MEDIUM_11_50',
        status: 'ACTIVE',
      },
    }),
    // Shield AI
    prisma.company.create({
      data: {
        name: 'Shield AI',
        slug: 'shield-ai',
        shortDescription: 'AI pilot technology for autonomous aircraft',
        description: 'Shield AI builds AI pilots for aircraft. Their Hivemind technology enables intelligent teams of aircraft to perform missions autonomously.',
        logo: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
        website: 'https://shield.ai',
        headquarters: 'San Diego, CA',
        foundedYear: 2015,
        industry: 'Autonomous Systems',
        companyType: 'STARTUP',
        employeeRange: 'LARGE_51_200',
        status: 'ACTIVE',
      },
    }),
    // Tempus AI
    prisma.company.create({
      data: {
        name: 'Tempus',
        slug: 'tempus',
        shortDescription: 'AI-enabled precision medicine platform',
        description: 'Tempus is a technology company advancing precision medicine through AI and data. Improving patient care with practical applications of AI.',
        logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
        website: 'https://tempus.com',
        headquarters: 'Chicago, IL',
        foundedYear: 2015,
        industry: 'Healthcare AI',
        companyType: 'ENTERPRISE',
        employeeRange: 'ENTERPRISE_501_PLUS',
        status: 'ACTIVE',
      },
    }),
  ])

  console.log(`✓ Created ${companies.length} companies`)

  const products = []

  products.push(
    await prisma.product.create({
      data: {
        companyId: companies[0].id,
        name: 'ChatGPT',
        slug: 'chatgpt',
        description: 'Conversational AI assistant that can help with writing, analysis, coding, and more.',
        website: 'https://chat.openai.com',
      },
    }),
    await prisma.product.create({
      data: {
        companyId: companies[0].id,
        name: 'GPT-4',
        slug: 'gpt-4',
        description: 'Large multimodal model with advanced reasoning capabilities.',
        website: 'https://openai.com/gpt-4',
      },
    }),
    await prisma.product.create({
      data: {
        companyId: companies[0].id,
        name: 'DALL-E',
        slug: 'dall-e',
        description: 'AI system that creates realistic images from text descriptions.',
        website: 'https://openai.com/dall-e',
      },
    })
  )

  products.push(
    await prisma.product.create({
      data: {
        companyId: companies[1].id,
        name: 'Claude',
        slug: 'claude',
        description: 'AI assistant focused on being helpful, harmless, and honest.',
        website: 'https://claude.ai',
      },
    })
  )

  products.push(
    await prisma.product.create({
      data: {
        companyId: companies[6].id,
        name: 'Stable Diffusion',
        slug: 'stable-diffusion',
        description: 'Open-source text-to-image diffusion model.',
        website: 'https://stability.ai/stable-diffusion',
      },
    })
  )

  console.log(`✓ Created ${products.length} products`)

  const companyCategories = []

  const linkCategory = async (companyIndex: number, categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName)
    if (category) {
      companyCategories.push(
        await prisma.companyCategory.create({
          data: {
            companyId: companies[companyIndex].id,
            categoryId: category.id,
          },
        })
      )
    }
  }

  await linkCategory(0, 'Large Language Models')
  await linkCategory(0, 'Generative AI')
  await linkCategory(0, 'AI Research')

  await linkCategory(1, 'Large Language Models')
  await linkCategory(1, 'AI Safety')
  await linkCategory(1, 'AI Research')

  await linkCategory(2, 'AI Research')
  await linkCategory(2, 'AI Safety')

  await linkCategory(3, 'Large Language Models')
  await linkCategory(3, 'Generative AI')

  await linkCategory(4, 'Large Language Models')
  await linkCategory(4, 'Enterprise AI')

  await linkCategory(5, 'AI Infrastructure')

  await linkCategory(6, 'Generative AI')
  await linkCategory(6, 'Computer Vision')

  await linkCategory(7, 'Generative AI')
  await linkCategory(7, 'Computer Vision')

  await linkCategory(8, 'AI Infrastructure')

  await linkCategory(9, 'AI Infrastructure')

  await linkCategory(10, 'Generative AI')

  await linkCategory(11, 'AI Agents')

  await linkCategory(12, 'AI Agents')

  await linkCategory(13, 'AI Agents')

  await linkCategory(14, 'AI Agents')

  await linkCategory(15, 'Generative AI')

  await linkCategory(16, 'Generative AI')

  await linkCategory(17, 'AI Infrastructure')

  await linkCategory(18, 'AI Infrastructure')

  await linkCategory(19, 'Large Language Models')

  await linkCategory(20, 'Enterprise AI')

  await linkCategory(21, 'Enterprise AI')

  await linkCategory(22, 'Enterprise AI')

  await linkCategory(23, 'Enterprise AI')

  await linkCategory(24, 'Enterprise AI')

  await linkCategory(25, 'Enterprise AI')

  await linkCategory(26, 'Enterprise AI')

  await linkCategory(32, 'AI Infrastructure')

  await linkCategory(33, 'AI Infrastructure')

  await linkCategory(34, 'AI Infrastructure')

  await linkCategory(35, 'AI Infrastructure')

  await linkCategory(36, 'AI Infrastructure')

  await linkCategory(37, 'AI Infrastructure')

  await linkCategory(38, 'AI Infrastructure')

  await linkCategory(39, 'AI Infrastructure')

  await linkCategory(40, 'AI Infrastructure')

  await linkCategory(43, 'Computer Vision')

  await linkCategory(44, 'Computer Vision')

  console.log(`✓ Created ${companyCategories.length} company-category links`)

  const relations = []

  const relate = async (index1: number, index2: number) => {
    relations.push(
      await prisma.companyRelation.create({
        data: {
          companyId: companies[index1].id,
          relatedCompanyId: companies[index2].id,
        },
      })
    )
  }

  await relate(0, 1)
  await relate(0, 3)
  await relate(0, 4)
  await relate(1, 3)
  await relate(1, 4)

  await relate(6, 7)
  await relate(6, 10)
  await relate(7, 10)

  await relate(11, 12)
  await relate(11, 13)
  await relate(12, 13)

  await relate(5, 8)
  await relate(5, 17)
  await relate(8, 17)

  await relate(34, 35)
  await relate(34, 36)
  await relate(35, 37)

  await relate(27, 28)
  await relate(27, 29)
  await relate(28, 30)

  console.log(`✓ Created ${relations.length} company relations`)

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
