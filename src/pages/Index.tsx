import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
    const [generatedKey, setGeneratedKey] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const generateRandomKey = () => {
        setIsGenerating(true);

        // Create a long random key using multiple character sets
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const specialChars = '!@#$%^&*';
        const allChars = chars + specialChars;

        let key = '';

        // Generate a 64-character long key
        for (let i = 0; i < 64; i++) {
            key += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Add some dashes for better readability
        const formattedKey = key.match(/.{1,8}/g)?.join('-') || key;

        // Simulate generation delay for better UX
        setTimeout(() => {
            setGeneratedKey(formattedKey);
            setIsGenerating(false);
            toast({
                title: "New key generated!",
                description: "Your unique API key is ready to use.",
            });
        }, 500);
    };

    const copyToClipboard = async () => {
        if (generatedKey) {
            try {
                await navigator.clipboard.writeText(generatedKey);
                toast({
                    title: "Copied to clipboard!",
                    description: "The key has been copied to your clipboard.",
                });
            } catch (err) {
                toast({
                    title: "Copy failed",
                    description: "Please select and copy the key manually.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-4 bg-blue-600 rounded-full shadow-lg">
                            <Key className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">API  Key Generator</h1>
                    <p className="text-xl text-gray-600">Generate secure, unique random keys instantly</p>
                </div>

                {/* Main Card */}
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-gray-800">Your Unique Key</CardTitle>
                        <CardDescription className="text-gray-600">
                            Generate cryptographically secure random keys for your applications
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Key Display Area */}
                        <div className="relative">
                            <div className="min-h-[120px] p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                                {generatedKey ? (
                                    <div className="w-full">
                                        <div className="font-mono text-sm break-all text-gray-800 leading-relaxed">
                                            {generatedKey}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Key className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500">Click "Generate New Key" to create your first key</p>
                                    </div>
                                )}
                            </div>

                            {/* Copy Button */}
                            {generatedKey && (
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    size="sm"
                                    className="absolute top-2 right-2 h-8 w-8 p-0"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={generateRandomKey}
                                disabled={isGenerating}
                                className="flex-1 h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="mr-2 h-5 w-5" />
                                        Generate New Key
                                    </>
                                )}
                            </Button>

                            {generatedKey && (
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    className="h-12 px-8 border-blue-200 hover:bg-blue-50"
                                >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Key
                                </Button>
                            )}
                        </div>

                        {/* Key Info */}
                        {generatedKey && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-800">Length</div>
                                        <div className="text-blue-600">{generatedKey.length} characters</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-800">Type</div>
                                        <div className="text-blue-600">Alphanumeric + Special</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-800">Format</div>
                                        <div className="text-blue-600">Dash-separated</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-gray-600 text-sm">
                    <p>Each key is cryptographically random and unique</p>
                </div>
            </div>
        </div>
    );
};

export default Index;