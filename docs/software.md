---
icon: lucide/code-xml
---

# Software

[:octicons-mark-github-16: Browse the lab’s software repositories on GitHub](https://github.com/mancusolab)

## Molecular QTL mapping and fine-mapping

- [**jaxQTL**](https://github.com/mancusolab/jaxqtl) maps molecular QTLs from genotype and expression data. Its count-based models support cis-QTL scans and nominal association tests for single-cell expression traits.
- [**SuShiE**](https://github.com/mancusolab/sushie) fine-maps molecular QTLs across ancestries. It identifies credible sets of shared variants, estimates how their effects correlate across ancestries, and produces ancestry-specific prediction weights for FUSION TWAS.

## Transcriptome-wide association studies (TWAS)

- [**FOCUS and MA-FOCUS**](https://github.com/mancusolab/ma-focus) use GWAS summary statistics and eQTL weights to identify credible sets of genes at TWAS loci. The MA-FOCUS implementation supports both single-ancestry and multi-ancestry analyses.
- [**TWAS Simulator**](https://github.com/mancusolab/twas_sim) simulates complex traits from latent gene expression, fits eQTL weights in an independent sample, and runs GWAS and TWAS on the simulated traits.
- [**RHOGE**](https://github.com/bogdanlab/rhoge) estimates the genome-wide correlation between the effects of predicted gene expression on two traits from their TWAS results. Its bidirectional regression assesses potential directions of causality.

## GWAS and admixture mapping summary statistics

- [**FactorGo**](https://github.com/mancusolab/factorgo) uses variational factor analysis to identify shared genetic factors across traits from GWAS summary statistics. It estimates phenotype scores and variant loadings for each factor.
- [**FIZI**](https://github.com/bogdanlab/fizi) imputes missing GWAS Z-scores using functional annotations and linkage disequilibrium from a reference panel.
- [**HAMSTA**](https://github.com/tszfungc/hamsta) uses admixture mapping summary statistics to estimate the heritability explained by local ancestry. It also estimates test statistic inflation and genome-wide significance thresholds.

## Genotype data and population genetics

- [**genoio**](https://github.com/mancusolab/genoio) reads PLINK 1 and 2, VCF/BCF, and BGEN files into sample-by-variant matrices in Python. Its Rust readers can stream blocks of variants with their metadata.
- [**drifft**](https://github.com/mancusolab/drifft) tracks how allele-count distributions change across generations under a Wright–Fisher model. Its JAX implementation can calculate how expectations change with selection parameters.

## Statistical and computational methods

- [**glmax**](https://github.com/mancusolab/glmax) fits generalized linear models in JAX and supports prediction, statistical inference, and model diagnostics. Users can differentiate through the fitted coefficients.
- [**SuSiE-PCA**](https://github.com/mancusolab/susiepca) performs sparse principal component analysis. For each component, it reports posterior inclusion probabilities that quantify the evidence for each feature’s contribution.
- [**traceax**](https://github.com/mancusolab/traceax) estimates the trace of a linear operator in JAX using only matrix–vector products.
