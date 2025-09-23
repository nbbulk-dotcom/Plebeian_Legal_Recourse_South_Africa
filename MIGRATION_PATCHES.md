# 🔧 PYDANTIC v1→v2 MIGRATION PATCHES
## Constitutional Liberation Platform - Automated Migration Plan

**Generated:** December 23, 2024
**Risk Level:** MEDIUM - Requires careful review before application

---

## 📋 PATCH SUMMARY

### Files Requiring Changes: 6
### Automated Patches: 4 (Low Risk)
### Manual Review Required: 2 (Medium Risk)

---

## 🟢 LOW RISK - AUTOMATED PATCHES

### PATCH 1: Copilot Service Config Migration
**File:** `services/copilot-client/app/config.py`
**Risk:** LOW - Simple Config class migration

```python
# BEFORE (Pydantic v1 pattern)
class Settings(BaseSettings):
    # ... fields ...
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# AFTER (Pydantic v2 pattern)
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8")
    # ... fields ...
```

### PATCH 2: Backend Main.py Dict Method Migration
**File:** `backend/app/main.py`
**Risk:** LOW - Simple method name change

```python
# BEFORE (Lines 234, 238)
user_details=request.user_details.dict(),
case_details=request.case_details.dict(),

# AFTER
user_details=request.user_details.model_dump(),
case_details=request.case_details.model_dump(),
```

### PATCH 3: Copilot Service Dependency Versions
**File:** `services/copilot-client/pyproject.toml`
**Risk:** LOW - Version alignment

```toml
# BEFORE
pydantic = "1.10.9"
fastapi = "0.100.0"
sqlalchemy = "2.0.20"

# AFTER
pydantic = "2.11.9"
pydantic-settings = "2.10.1"
fastapi = "0.104.1"
sqlalchemy = "2.0.23"
```

### PATCH 4: Backend Config Completion
**File:** `backend/app/config.py`
**Risk:** LOW - Complete the migration started earlier

```python
# CURRENT (Incomplete)
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    # Missing model_config

# AFTER (Complete)
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8")
    # ... all fields ...
```

---

## 🟡 MEDIUM RISK - MANUAL REVIEW REQUIRED

### MANUAL REVIEW 1: Copilot Service HTTP Response
**File:** `services/copilot-client/app/coproxy.py`
**Issue:** `.json()` method found - needs context analysis

```python
# FOUND (Line unknown)
return resp.json()

# ANALYSIS NEEDED:
# - Is this httpx.Response.json() (OK) or Pydantic model.json() (NEEDS CHANGE)?
# - Context: HTTP response parsing vs Pydantic serialization
```

### MANUAL REVIEW 2: Schema Validation Patterns
**Files:** Multiple schema files
**Issue:** Need to verify BaseModel usage patterns

```python
# FILES TO REVIEW:
# - services/copilot-client/app/schemas.py
# - backend/app/models/schemas.py
# - backend/app/api_prescreen.py

# CHECK FOR:
# - Custom validators (@validator, @root_validator)
# - Model configuration (Config classes)
# - Serialization patterns
```

---

## 🔧 AUTOMATED MIGRATION SCRIPT

### Phase 1: Safe Automated Changes
```bash
# 1. Update pyproject.toml versions
# 2. Replace .dict() with .model_dump()
# 3. Migrate Config classes to model_config
# 4. Update imports where safe
```

### Phase 2: Manual Verification
```bash
# 1. Review HTTP response .json() usage
# 2. Test all schema validations
# 3. Verify configuration loading
# 4. Run integration tests
```

---

## 🎯 EXECUTION PLAN

### Step 1: Apply Automated Patches (5 minutes)
- Update dependency versions
- Replace method calls
- Migrate config classes

### Step 2: Manual Review (15 minutes)
- Analyze .json() usage context
- Verify schema patterns
- Test configuration loading

### Step 3: Integration Testing (10 minutes)
- Test copilot service startup
- Test backend API endpoints
- Verify environment loading

### Step 4: Rollback Plan
- Git stash available for immediate rollback
- Individual file patches can be reverted
- Dependency lock files preserved

---

## ⚠️ CRITICAL WARNINGS

1. **DO NOT APPLY** until you've reviewed each patch
2. **BACKUP CURRENT STATE** before applying any changes
3. **TEST EACH SERVICE** individually after migration
4. **VERIFY ENVIRONMENT LOADING** works correctly

---

## 🚀 READY TO PROCEED?

**Current Status:** PATCHES PREPARED - AWAITING APPROVAL

**Next Action:** Review patches above and confirm:
- [ ] Automated patches look correct
- [ ] Manual review items are understood
- [ ] Rollback plan is acceptable
- [ ] Ready to proceed with Phase 1

**Command to proceed:** "Apply automated patches" or "Show me specific patch details first"
