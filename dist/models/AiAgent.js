"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AgentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    business: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Business', required: true },
    aiModel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'AIModel', required: true },
    responseTemplates: { type: mongoose_1.Schema.Types.Mixed, required: true },
    integrationOptions: { type: [String], default: ["website"] }, //for premium subscription allow whatsapp also
    intregatedDomains: { type: [String], default: [] },
    intregatedWhatsApps: { type: [String], default: [] },
    personality: {
        tone: {
            type: String,
            enum: ['formal', 'friendly', 'neutral'],
            default: 'friendly',
        },
        instruction: { type: String },
    },
    fallbackBehavior: {
        enabled: { type: Boolean, default: true },
        forwardToHuman: { type: Boolean, default: true },
        fallbackMessage: {
            type: String,
            default: 'Let me connect you to a human.',
        },
    },
    analytics: {
        totalConversations: { type: Number, default: 0 },
        avgResponseTime: { type: Number, default: 0 },
        customerSatisfaction: { type: Number, default: 0 },
    },
    active: { type: Boolean, default: false },
    languageSupport: { type: [String], default: ['en', 'es', 'bn'] },
}, { timestamps: true });
AgentSchema.index({ business: 1 });
AgentSchema.index({ name: 1, business: 1 }, { unique: true });
exports.default = mongoose_1.default.model('Agent', AgentSchema);
