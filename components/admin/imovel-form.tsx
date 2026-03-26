"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";
import { ImovelCompleto, StatusImovel, TipoImovel } from "@/lib/db";
import Image from "next/image";

interface ImovelFormProps {
  imovel?: ImovelCompleto;
}

const tiposOptions = [
  { value: "apartamento", label: "Apartamento" },
  { value: "casa", label: "Casa" },
  { value: "terreno", label: "Terreno" },
  { value: "comercial", label: "Comercial" },
  { value: "cobertura", label: "Cobertura" },
];

const statusOptions = [
  { value: "disponivel", label: "Disponível" },
  { value: "vendido", label: "Vendido" },
  { value: "reservado", label: "Reservado" },
  { value: "em_construcao", label: "Em Construção" },
];

export function ImovelForm({ imovel }: ImovelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [titulo, setTitulo] = useState(imovel?.titulo || "");
  const [descricao, setDescricao] = useState(imovel?.descricao || "");
  const [tipo, setTipo] = useState(imovel?.tipo || "apartamento");
  const [status, setStatus] = useState(imovel?.status || "disponivel");
  const [preco, setPreco] = useState(imovel?.preco?.toString() || "");
  const [areaTotal, setAreaTotal] = useState(
    imovel?.area_total?.toString() || "",
  );
  const [areaConstruida, setAreaConstruida] = useState(
    imovel?.area_construida?.toString() || "",
  );
  const [quartos, setQuartos] = useState(imovel?.quartos?.toString() || "0");
  const [suites, setSuites] = useState(imovel?.suites?.toString() || "0");
  const [banheiros, setBanheiros] = useState(
    imovel?.banheiros?.toString() || "0",
  );
  const [vagas, setVagas] = useState(imovel?.vagas?.toString() || "0");
  const [endereco, setEndereco] = useState(imovel?.endereco || "");
  const [bairro, setBairro] = useState(imovel?.bairro || "");
  const [cidade, setCidade] = useState(imovel?.cidade || "");
  const [estado, setEstado] = useState(imovel?.estado || "");
  const [cep, setCep] = useState(imovel?.cep || "");
  const [destaque, setDestaque] = useState(imovel?.destaque || false);
  const [ativo, setAtivo] = useState(imovel?.ativo !== false);

  // Imagens (URLs)
  const [imagens, setImagens] = useState<
    { url: string; alt: string; principal: boolean }[]
  >(
    imovel?.imagens.map((img) => ({
      url: img.url,
      alt: img.alt || "",
      principal: img.principal,
    })) || [],
  );
  const [novaImagemUrl, setNovaImagemUrl] = useState("");

  // Características
  const [caracteristicas, setCaracteristicas] = useState<string[]>(
    imovel?.caracteristicas || [],
  );
  const [novaCaracteristica, setNovaCaracteristica] = useState("");

  const addImagem = () => {
    if (novaImagemUrl.trim()) {
      setImagens([
        ...imagens,
        { url: novaImagemUrl.trim(), alt: "", principal: imagens.length === 0 },
      ]);
      setNovaImagemUrl("");
    }
  };

  const removeImagem = (index: number) => {
    const newImagens = imagens.filter((_, i) => i !== index);
    if (newImagens.length > 0 && !newImagens.some((img) => img.principal)) {
      newImagens[0].principal = true;
    }
    setImagens(newImagens);
  };

  const setPrincipal = (index: number) => {
    setImagens(imagens.map((img, i) => ({ ...img, principal: i === index })));
  };

  const addCaracteristica = () => {
    if (
      novaCaracteristica.trim() &&
      !caracteristicas.includes(novaCaracteristica.trim())
    ) {
      setCaracteristicas([...caracteristicas, novaCaracteristica.trim()]);
      setNovaCaracteristica("");
    }
  };

  const removeCaracteristica = (index: number) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = {
        titulo,
        descricao,
        tipo,
        status,
        preco: preco ? parseFloat(preco) : null,
        area_total: areaTotal ? parseFloat(areaTotal) : null,
        area_construida: areaConstruida ? parseFloat(areaConstruida) : null,
        quartos: parseInt(quartos) || 0,
        suites: parseInt(suites) || 0,
        banheiros: parseInt(banheiros) || 0,
        vagas: parseInt(vagas) || 0,
        endereco,
        bairro,
        cidade,
        estado,
        cep,
        destaque,
        ativo,
        imagens,
        caracteristicas,
      };

      const url = imovel ? `/api/imoveis/${imovel.id}` : "/api/imoveis";
      const method = imovel ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erro ao salvar");
      }

      router.push("/admin/imoveis");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar imóvel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="titulo">Título *</FieldLabel>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Apartamento Vista Mar"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o imóvel..."
                rows={4}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tipo">Tipo *</FieldLabel>
                <Select
                  value={tipo}
                  onValueChange={(value) => setTipo(value as TipoImovel)}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as StatusImovel)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="preco">Preço (R$)</FieldLabel>
              <Input
                id="preco"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="850000"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Características do Imóvel */}
      {tipo !== "terreno" && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Imóvel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field>
                <FieldLabel htmlFor="quartos">Quartos</FieldLabel>
                <Input
                  id="quartos"
                  type="number"
                  min="0"
                  value={quartos}
                  onChange={(e) => setQuartos(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="suites">Suítes</FieldLabel>
                <Input
                  id="suites"
                  type="number"
                  min="0"
                  value={suites}
                  onChange={(e) => setSuites(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="banheiros">Banheiros</FieldLabel>
                <Input
                  id="banheiros"
                  type="number"
                  min="0"
                  value={banheiros}
                  onChange={(e) => setBanheiros(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="vagas">Vagas</FieldLabel>
                <Input
                  id="vagas"
                  type="number"
                  min="0"
                  value={vagas}
                  onChange={(e) => setVagas(e.target.value)}
                />
              </Field>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Áreas */}
      <Card>
        <CardHeader>
          <CardTitle>Áreas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="areaTotal">Área Total (m²)</FieldLabel>
              <Input
                id="areaTotal"
                type="number"
                step="0.01"
                value={areaTotal}
                onChange={(e) => setAreaTotal(e.target.value)}
                placeholder="120"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="areaConstruida">
                Área Construída (m²)
              </FieldLabel>
              <Input
                id="areaConstruida"
                type="number"
                step="0.01"
                value={areaConstruida}
                onChange={(e) => setAreaConstruida(e.target.value)}
                placeholder="95"
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Localização */}
      <Card>
        <CardHeader>
          <CardTitle>Localização</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="endereco">Endereço</FieldLabel>
              <Input
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, número"
              />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="bairro">Bairro</FieldLabel>
                <Input
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="cidade">Cidade</FieldLabel>
                <Input
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <Input
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="SC"
                  maxLength={2}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="cep">CEP</FieldLabel>
              <Input
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="00000-000"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Imagens */}
      <Card>
        <CardHeader>
          <CardTitle>Imagens (URLs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={novaImagemUrl}
                onChange={(e) => setNovaImagemUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addImagem())
                }
              />
              <Button type="button" onClick={addImagem} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {imagens.length > 0 && (
              <div className="space-y-2">
                {imagens.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || "Imagem do imóvel"}
                      width={64}
                      height={48}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <p className="flex-1 text-sm truncate">{img.url}</p>
                    <Button
                      type="button"
                      variant={img.principal ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPrincipal(index)}
                    >
                      {img.principal ? "Principal" : "Definir"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImagem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Características */}
      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={novaCaracteristica}
                onChange={(e) => setNovaCaracteristica(e.target.value)}
                placeholder="Ex: Piscina, Churrasqueira, etc."
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCaracteristica())
                }
              />
              <Button
                type="button"
                onClick={addCaracteristica}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {caracteristicas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caracteristicas.map((carac, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{carac}</span>
                    <button
                      type="button"
                      onClick={() => removeCaracteristica(index)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Opções */}
      <Card>
        <CardHeader>
          <CardTitle>Opções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Imóvel em Destaque</p>
                <p className="text-sm text-muted-foreground">
                  Aparecerá em posição privilegiada na listagem
                </p>
              </div>
              <Switch checked={destaque} onCheckedChange={setDestaque} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ativo</p>
                <p className="text-sm text-muted-foreground">
                  Imóvel visível no site
                </p>
              </div>
              <Switch checked={ativo} onCheckedChange={setAtivo} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : imovel ? (
            "Salvar Alterações"
          ) : (
            "Criar Imóvel"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
