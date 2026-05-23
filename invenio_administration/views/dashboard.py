# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-FileCopyrightText: 2024 KTH Royal Institute of Technology.
# SPDX-License-Identifier: MIT

"""Invenio Administration dashboard view."""

from invenio_i18n import lazy_gettext as _

from invenio_administration.permissions import administration_dashboard_permission
from invenio_administration.views.base import AdminView


class AdminDashboardView(AdminView):
    """Admin dashboard view."""

    template = "invenio_administration/index.html"
    name = "dashboard"
    url = "/"
    icon = "home"
    title = _("Dashboard")
    menu_label = _("Dashboard")

    decorators = [administration_dashboard_permission.require(http_exception=403)]

    def get_permission(self):
        """Return the permission used to determine menu visibility."""
        return administration_dashboard_permission
