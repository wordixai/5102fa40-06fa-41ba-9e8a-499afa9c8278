import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface VirtualTryOnRequest {
  personImage: string;
  clothingImage: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { personImage, clothingImage }: VirtualTryOnRequest = await req.json();

    if (!personImage) {
      return new Response(
        JSON.stringify({ error: "请上传一张人物照片" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!clothingImage) {
      return new Response(
        JSON.stringify({ error: "请选择一件服装" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Processing virtual try-on request...");

    const prompt = `You are a virtual try-on AI. I'm giving you two images:
1. First image: A photo of a person
2. Second image: A clothing item

Your task: Generate a new image showing the person from image 1 wearing the clothing from image 2.

Requirements:
- Keep the person's face, body, pose, skin tone, and hair exactly the same
- Replace their current clothing with the clothing from image 2
- The clothing should fit naturally on the person's body
- Maintain realistic lighting and shadows
- Keep the same background as the original person photo
- Output only the final edited image, no text explanation needed`;

    const response = await fetch("https://www.needware.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        modalities: ["text", "image"],
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: personImage,
              },
              {
                type: "image_url",
                image_url: clothingImage,
              },
            ],
          },
        ],
        temperature: 0.7,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI service error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求频率过高，请稍后再试" }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI 服务额度已用尽" }),
          { status: 402, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      throw new Error(`AI 处理失败: ${errorText}`);
    }

    const result = await response.json();

    // Extract generated image from response
    let generatedImageUrl: string | null = null;

    const images = result.choices?.[0]?.message?.images;
    if (images && images.length > 0 && images[0].image_url?.url) {
      generatedImageUrl = images[0].image_url.url;
    }

    return new Response(
      JSON.stringify({
        resultImage: generatedImageUrl,
        message: generatedImageUrl ? "换装效果生成成功" : "未能生成图片，请重试",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Virtual try-on error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "换装处理失败，请重试" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
